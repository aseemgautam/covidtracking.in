import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Papa from 'papaparse';
import Utils from './Utils';
import MovingAverage from './MovingAverage';
import IndiaStates from '../public/india-states.json';

let instance = null;

class Districts {
	constructor() {
		if (!instance) {
			instance = this;
		}

		this._all = [];
		this._latest = [];
		this.list = []; // list of all { state, district }
		return instance;
	}

	_districtPopulation = async () => {
		const res = await fetch('https://api.covid19india.org/v4/data.json');
		const json = await res.json();
		const districtPop = [];
		IndiaStates.states.forEach(
			state => {
				let stateCode;
				stateCode = state.code;
				if (state.name === 'Telengana') {
					stateCode = 'TL';
				}
				if (state.name === 'Chhattisgarh') {
					stateCode = 'CT';
				}
				if (state.name === 'Chandigarh') {
					stateCode = 'CH';
				}
				if (state.name === 'Dadra and Nagar Haveli and Daman and Diu') {
					stateCode = 'DN';
				}
				if (state.name === 'Odisha') {
					stateCode = 'OR';
				}
				if (state.name === 'Uttarakhand') {
					stateCode = 'UT';
				}
				// console.log(json[stateCode].districts);
				// console.log(state.name, stateCode);
				if (json[stateCode]) {
				// eslint-disable-next-line no-restricted-syntax
					for (const [name, value] of Object.entries(json[stateCode].districts)) {
						if (value.meta && value.meta.population) {
							districtPop.push({ state: state.name, district: name, population: value.meta.population });
						} else {
							districtPop.push({ state: state.name, district: name, population: 0 });
						}
					}
				}
			});
		return districtPop;
	}

	_fetch = async () => {
		const res = await fetch('https://api.covid19india.org/csv/latest/districts.csv');
		const text = await res.text();
		const { data } = Papa.parse(text, {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,
			transformHeader(h) {
				if (h === 'Deceased') {
					return 'deaths';
				}
				return h.toLowerCase();
			}
		});
		const lastDate = _.last(data).date;
		const invalid = ['Other State', 'Unknown', 'Italians', 'Foreign Evacuees', 'Airport Quarantine'];
		const valid = _.filter(_.filter(data, { date: lastDate }), e => {
			return !invalid.includes(e.district);
		});
		const populations = await this._districtPopulation();
		this._all.length = 0;
		this._latest.length = 0;
		valid.forEach(record => { // loop all districts
			// console.log(record.state, record.district);
			const { population } = _.find(populations, { state: record.state, district: record.district });
			// console.log(population);
			const districtData = _.filter(data, { state: record.state, district: record.district })
				.map((curr, idx, src) => {
					return {
						...curr,
						newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
						newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
						newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
						active: curr.confirmed - curr.deaths - curr.recovered,
						deathRate: curr.deaths > 1 ? Utils.round((curr.deaths * 100) / (curr.recovered + curr.deaths)) : '-',
						population
					};
				});
			let isMissing = false;
			const date = new Date();
			date.setDate(date.getDate() - 30);
			for (let d = date; d <= new Date(lastDate); d.setDate(d.getDate() + 1)) {
				if (!_.find(districtData, { date: d.toISOString().split('T')[0] })) {
					// console.log(districtData[0].state, districtData[0].district, 'found');
					isMissing = true;
					break;
				}
			}
			if (!isMissing) {
				MovingAverage.calculate(districtData, 'newCases');
				MovingAverage.for7days(districtData, 'newRecover', 'newRecovered7DayMA');
				MovingAverage.for7days(districtData, 'newCases', 'newCases7DayMA');

				const last = _.last(districtData);
				last.ma14 = _.nth(districtData, -14).movingAvg14daysRate;
				last.ma13 = _.nth(districtData, -13).movingAvg14daysRate;
				last.ma11 = _.nth(districtData, -11).movingAvg14daysRate;
				last.ma9 = _.nth(districtData, -9).movingAvg14daysRate;
				last.ma7 = _.nth(districtData, -7).movingAvg14daysRate;
				last.ma5 = _.nth(districtData, -5).movingAvg14daysRate;
				last.ma3 = _.nth(districtData, -3).movingAvg14daysRate;
				last.ma0 = last.movingAvg14daysRate;
				const casesPerMillion = last.population > 0 ? Math.round((last.confirmed * 1000000) / last.population) : 0;
				last.casesPerMillion = casesPerMillion < 0 ? 0 : casesPerMillion;
				const offset = last.newCases === 0 ? -1 : 0;
				last.casesInLast7Days = districtData.slice(-7 + offset).reduce(this.sum, 0);
				last.casesPerMillionLast7Days = last.population > 0
					? Math.round((last.casesInLast7Days * 1000000) / last.population) : 0;
				this._latest.push(last);
				this._all.push(...districtData);
			}
		});
		return this._all;
	}

	single = async (state, district) => {
		if (this._all.length <= 0) {
			await this._fetch();
		}
		return _.filter(this._all, { state, district });
	}

	sum = (acc, curr) => { return acc + curr.newCases; };

	latest = async () => {
		if (this._all.length <= 0) {
			await this._fetch();
		}
		return _.filter(this._latest, district => {
			return district.confirmed > 100;
		});
	};
}

const districts = new Districts();
export default districts;
