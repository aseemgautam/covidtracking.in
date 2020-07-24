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
		json[Object.keys(json)[0]].forEach(val => {
			// eslint-disable-next-line no-param-reassign
			val.date = this.convertDate(val.updatedon.replace(/\//g, ''));
		});
		IndianStates.states.forEach(
			state => {
				const testsByState = _.filter(json[Object.keys(json)[0]], {
					state: state.name === 'Dadra and Nagar Haveli' ? 'Dadra and Nagar Haveli and Daman and Diu' : state.name
				});
				if (testsByState && testsByState.length > 0) {
					let prev = 0;
					for (let d = new Date(testsByState[0].date); d <= new Date(); d.setDate(d.getDate() + 1)) {
						const testForDate = _.find(testsByState, { date: d.toISOString().split('T')[0] });
						if (testForDate && testForDate.totaltested) {
							this._all.push({
								date: testForDate.date,
								state: state.name,
								totalTests: testForDate.totaltested
							});
							prev = testForDate;
						} else {
							this._all.push({
								date: d.toISOString().split('T')[0],
								state: state.name,
								totalTests: prev.totaltested
							});
						}
					}
				}
			}
		);
		return this._all;
	}

	convertDate = ddmmyyyy => {
		return `${ddmmyyyy.substring(4, 8)}-${ddmmyyyy[2]}${ddmmyyyy[3]}-${ddmmyyyy[0]}${ddmmyyyy[1]}`;
	}

	sortByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }
}

const covidDataTesting = new CovidDataTesting();
export default covidDataTesting;
