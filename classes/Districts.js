import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Papa from 'papaparse';
import MovingAverage from './MovingAverage';
import IndiaStates from '../public/india-states.json';
import DistrictPopulation from '../public/district-population.json';

class Districts {
	constructor() {
		this._all = [];
		this._latest = [];
		this.list = [];
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

	duplicates = async () => {
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
		return valid;
	}

	_fetch = async () => {
		if (this._all.length > 0) {
			return this._all;
		}
		// eslint-disable-next-line global-require
		const { performance } = require('perf_hooks');
		const t0 = performance.now();
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
		const t1 = performance.now();
		console.log(`Fetch took ${(t1 - t0) / 1000} seconds.`);
		const lastDate = _.last(data).date;
		const invalid = ['Other State', 'Unknown', 'Italians', 'Foreign Evacuees', 'Airport Quarantine'];
		const excludeStates = ['Arunachal Pradesh', 'Meghalaya', 'Nagaland', 'Mizoram'];
		const valid = _.filter(_.filter(data, { date: lastDate }), e => {
			return !invalid.includes(e.district) && !excludeStates.includes(e.state) && e.confirmed > 100;
		});
		const t2 = performance.now();
		console.log(`Invalid Filter took ${(t2 - t1) / 1000} seconds.`);
		const populations = DistrictPopulation;
		this._all.length = 0;
		this._latest.length = 0;
		valid.forEach(record => { // loop all districts
			const populationObj = _.find(populations, { state: record.state, district: record.district });
			const population = populationObj ? populationObj.population : 0;
			const districtData = _.filter(data, district => {
				return district.state === record.state && district.district === record.district && district.date > '2021-03-01';
			}).map((curr, idx, src) => {
				return {
					...curr,
					newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
					newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
					newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
					newActive: idx === 0 ? 0 : (curr.confirmed - curr.deaths - curr.recovered)
							- (src[idx - 1].confirmed - src[idx - 1].deaths - src[idx - 1].recovered),
					active: curr.confirmed - curr.deaths - curr.recovered,
					population
				};
			});
			if (districtData.length > 14) {
				MovingAverage.calculate(districtData, 'newCases');
				MovingAverage.for7days(districtData, 'newRecover', 'newRecovered7DayMA', true);
				MovingAverage.for7days(districtData, 'newCases', 'newCases7DayMA', true);
				MovingAverage.for7days(districtData, 'newDeaths', 'newDeaths7DayMA', true);

				const last = _.last(districtData);
				last.ma14 = _.nth(districtData, -15).movingAvg7days;
				last.ma13 = _.nth(districtData, -13).movingAvg7days;
				last.ma11 = _.nth(districtData, -11).movingAvg7days;
				last.ma9 = _.nth(districtData, -9).movingAvg7days;
				last.ma7 = _.nth(districtData, -7).movingAvg7days;
				last.ma5 = _.nth(districtData, -5).movingAvg7days;
				last.ma3 = _.nth(districtData, -3).movingAvg7days;
				last.ma0 = last.movingAvg7days;
				last.casesPerMillion = last.population > 0 ? Math.round((last.confirmed * 1000000) / last.population) : 0;
				const offset = last.newCases === 0 ? -1 : 0;
				last.casesInLast7Days = districtData.slice(-7 + offset).reduce(this.sum, 0);
				const casesPerMillionLast7Days = last.population > 0
					? Math.round((last.casesInLast7Days * 1000000) / last.population) : 0;
				last.casesPerMillionLast7Days = casesPerMillionLast7Days >= 0 ? casesPerMillionLast7Days : 0;
				last.deathsPerMillion = last.deaths && last.population > 0
					? Math.round((last.deaths * 1000000) / last.population) : 0;
				last.newCasesYesterday = _.nth(districtData, -2).newCases;
				this._latest.push(last);
				this._all.push(...districtData);
			}
		});
		const t3 = performance.now();
		console.log(`Final Loop took ${(t3 - t2) / 1000} seconds.`);
		return this._all;
	}

	single = async (state, district) => {
		await this._fetch();
		return _.filter(this._all, { state, district });
	}

	sum = (acc, curr) => { return acc + curr.newCases; };

	latest = async () => {
		await this._fetch();
		return _.filter(this._latest, district => {
			return district.confirmed > 100;
		});
	};
}

const districts = new Districts();
Object.freeze(districts);
export default districts;
