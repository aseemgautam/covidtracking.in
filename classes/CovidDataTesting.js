import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import IndianStates from '../public/india-states.json';

let instance = null;

class CovidDataTesting {
	constructor() {
		if (!instance) {
			instance = this;
		}

		this._all = null;
		this._latest = null;
		return instance;
	}

	latest = async () => {
		if (this._latest) return this._latest;
		if (!this._all) await this.all();
		this._latest = [];
		IndianStates.states.forEach(
			state => {
				const stateData = _.filter(this._all, { state: state.name });
				if (stateData && _.last(stateData)) {
					this._latest.push(_.last(stateData));
				}
			}
		);
		return this._latest;
	}

	all = async () => {
		if (this._stateTestingData) return this._stateTestingData;

		const res = await fetch('https://api.covid19india.org/state_test_data.json');
		const json = await res.json();
		this._all = [];
		IndianStates.states.forEach(
			state => {
				this._all.push(
					..._.filter(json[Object.keys(json)[0]], {
						state: state.name === 'Dadra and Nagar Haveli' ? 'Dadra and Nagar Haveli and Daman and Diu' : state.name
					})
						.map((val, index, array) => {
							// eslint-disable-next-line no-useless-escape
							return { date: this.convertDate(val.updatedon.replace(/\//g, '')),
								state: state.name,
								totalTests: Number.parseInt(val.totaltested ? val.totaltested : array[index - 1].totaltested, 0) };
						})
				);
			}
		);
		return this._all;
	}

	convertDate = ddmmyyyy => {
		return `${ddmmyyyy.substring(4, 8)}-${ddmmyyyy[2]}${ddmmyyyy[3]}-${ddmmyyyy[0]}${ddmmyyyy[1]}`;
	}
}

const covidDataTesting = new CovidDataTesting();
export default covidDataTesting;
