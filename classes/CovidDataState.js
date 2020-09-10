import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Papa from 'papaparse';
import MovingAverage from './MovingAverage';
import IndianStates from '../public/india-states.json';
import Colors from './Colors';

let instance = null;

class CovidDataState {
	constructor() {
		if (!instance) {
			instance = this;
		}
		this._all = new Map();
		this._latest = null;
		return instance;
	}

	all = async () => {
		if (this._all.Size > 0) {
			return this._all;
		}
		// eslint-disable-next-line max-len
		// const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRyjPj_VXGIOYnCy5eoy3YcN9yA_yFKWd4AdkMXFam62N4Ik-D6A6cwFXt2N2LwpncJEd-dFn7s5Ez/pub?gid=2100676919&single=true&output=csv');
		const res = await fetch('https://api.covid19india.org/csv/latest/states.csv');
		const text = await res.text();
		const { data } = Papa.parse(text, {
			header: true,
			dynamicTyping: true,
			transformHeader(h) {
				if (h === 'Deceased') {
					return 'deaths';
				}
				return h.toLowerCase();
			}
		});
		// const data2 = _.filter(data, record => {
		// 	return record.date !== '2020-08-30';
		// });
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = _.filter(data, { state: state.name })
					.map((curr, idx, src) => {
						const newCases = idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed;
						const newTests = idx === 0 ? 0 : curr.tested - src[idx - 1].tested;
						return {
							...curr,
							newCases,
							newCasesPMil: idx === 0 ? 0 : Math.round(((curr.confirmed - src[idx - 1].confirmed) * 1000000)
							/ state.population),
							newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
							newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
							newTests: newTests > 0 ? newTests : 1,
							active: curr.confirmed - curr.deaths - curr.recovered,
							newActive: idx === 0 ? 0 : (curr.confirmed - curr.deaths - curr.recovered)
							- (src[idx - 1].confirmed - src[idx - 1].deaths - src[idx - 1].recovered),
							casesPerMillion: Math.round((curr.confirmed * 1000000) / state.population),
							deathRate: curr.deaths > 0 ? this.round((curr.deaths * 100) / (curr.recovered + curr.deaths)) : '',
							tests: curr.tested && curr.tested > 0 ? curr.tested : 0,
							dailyPositivity: newCases > 0 && newTests > 0 ? (newCases * 100) / newTests : 0,
							positivity: curr.tested && curr.tested ? parseFloat(((curr.confirmed * 100) / curr.tested).toFixed(2))
								: 0,
							testsPerMillion: curr.tested && curr.tested ? Math.round((curr.tested * 1000000) / state.population) : 0,
							deathsPerMillion: curr.deaths > 0 ? ((curr.deaths * 1000000) / state.population).toFixed(0) : 0
						};
					});
				MovingAverage.calculate(cases, 'newCases');
				MovingAverage.for7days(cases, 'newDeaths', 'newDeaths7DayMA', true);
				MovingAverage.for7days(cases, 'newTests', 'newTests7DayMA', true);
				MovingAverage.for7days(cases, 'dailyPositivity', 'dailyPositivity7DayMA', false);
				this._all.set(state.name, cases);
			}
		);
		return this._all;
	}

	latest = async () => {
		if (this._latest) {
			return this._latest;
		}
		await this.all();

		this._latest = [];
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = this._all.get(state.name);
				const latest = _.last(cases);
				if (latest) {
					latest.peak = cases.reduce((high, current) => {
						if (current.newCases > high) {
							// eslint-disable-next-line no-param-reassign
							high = current.newCases;
						}
						return high;
					}, 0);
					latest.trendColor = Colors.getTrendColorByName(latest.movingAvg14daysRate);
					latest.population = state.population;
					latest.stateCode = state.code;
					latest.isHigh = latest.newCases === latest.peak;
					latest.dailyDeathRate = latest.newDeaths > 0 && latest.newRecover
						? ((latest.newDeaths * 100) / (latest.newDeaths + latest.newRecover)).toFixed(2) : '';
					latest.dailyPositivity = latest.newTests > 0 ? ((latest.newCases * 100) / latest.newTests).toFixed(2) : '';
					latest.positivityDelta = latest.newTests > 0 ? latest.positivity - latest.positivityDelta : '';
					latest.is14dayLow = _.every(cases.slice(-14), curr => {
						return latest.newCases <= curr.newCases;
					});
					latest.newCasesTrend = (((latest.newCases - latest.movingAvg7days) * 100) / latest.movingAvg7days).toFixed(0);
					latest.testingTrend = latest.newTests > 0
						? (((latest.newTests - latest.newTests7DayMA) * 100) / latest.newTests7DayMA).toFixed(0) : 0;
					latest.is14dayHigh = _.every(cases.slice(-14), curr => {
						return latest.newCases >= curr.newCases;
					});
					latest.movingAvg7daysData = cases.slice(-8).reduce((acc, curr) => {
						acc.push(curr.movingAvg7days);
						return acc;
					}, []);
					latest.movingAvg14daysData = cases.slice(-15).map(curr => {
						return curr.movingAvg7days;
					}, []);
					// if (latest.state === 'Odisha') {
					// 	// console.log(latest.movingAvg14daysData);
					// 	console.log(cases.slice(-15));
					// }
					const sum = (acc, curr) => { return acc + curr.newCases; };
					const offset = latest.newCases === 0 ? -1 : 0;
					latest.newCases1to7days = cases.slice(-7 + offset).reduce(sum, 0);
					latest.newCases8to14days = cases.slice(cases.length - 15 + offset, cases.length - 8 + offset).reduce(sum, 0);
					latest.newCases15to21Days = cases.slice(cases.length - 22 + offset, cases.length - 15 + offset).reduce(sum, 0);
					latest.newCases22to28Days = cases.slice(cases.length - 29 + offset, cases.length - 22 + offset).reduce(sum, 0);
					// used in trend color, MovingAverageProgress
					latest.newCases14days = cases.slice(-14).reduce(sum, 0);
					this._latest.push(latest);
				}
			}
		);
		this._latest = _.orderBy(this._latest, ['confirmed'], ['desc']);
		return this._latest;
	}

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
}
const covidDataState = new CovidDataState();
export default covidDataState;
