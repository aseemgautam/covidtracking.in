import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Papa from 'papaparse';
import MovingAverage from './MovingAverage';
import CovidDataTesting from './CovidDataTesting';
import IndianStates from '../public/india-states.json';

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
		// if (this._all.Size > 0) {
		// 	return this._all;
		// }
		const testingData = await CovidDataTesting.all();
		// eslint-disable-next-line max-len
		const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRyjPj_VXGIOYnCy5eoy3YcN9yA_yFKWd4AdkMXFam62N4Ik-D6A6cwFXt2N2LwpncJEd-dFn7s5Ez/pub?gid=2100676919&single=true&output=csv');
		const text = await res.text();
		const { data } = Papa.parse(text, {
			header: true,
			dynamicTyping: true
		});
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = _.filter(data, { state: state.name })
					.map((curr, idx, src) => {
						const date = new Date(curr.date);
						let testForDate = _.find(testingData, { date: curr.date, state: state.name });
						let loops = 0;

						// no testing data present for current date
						// forward latest data availble in last 5 days
						while (!testForDate && loops < 5) {
							loops += 1;
							date.setDate(date.getDate() - 1);
							testForDate = _.find(testingData, { date: date.toISOString().split('T')[0], state: state.name });
						}

						return {
							...curr,
							newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
							newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
							newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
							active: curr.confirmed - curr.deaths - curr.recovered,
							newActive: idx === 0 ? 0 : (curr.confirmed - curr.deaths - curr.recovered)
							- (src[idx - 1].confirmed - src[idx - 1].deaths - src[idx - 1].recovered),
							casesPerMillion: Math.round((curr.confirmed * 1000000) / state.population),
							deathRate: curr.deaths > 5 ? this.round((curr.deaths * 100) / (curr.recovered + curr.deaths)) : '-',
							tests: testForDate ? testForDate.totalTests : 0,
							positivePercent: testForDate ? ((curr.confirmed * 100) / testForDate.totalTests).toFixed(2) : 0,
							testsPerMillion: testForDate ? Math.round((testForDate.totalTests * 1000000) / state.population) : 0,
							deathsPerMillion: curr.deaths > 5 ? ((curr.deaths * 1000000) / state.population).toFixed(2) : 0
						};
					});
				MovingAverage.calculate(cases, 'newCases');
				this._all.set(state.name, cases);
			}
		);
		return this._all;
	}

	latest = async () => {
		// if (this._latest) {
		// 	return this._latest;
		// }
		await this.all();

		this._latest = [];
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = this._all.get(state.name);
				MovingAverage.calculate(cases, 'newCases');
				const latest = _.last(cases);
				if (latest) {
					latest.peak = cases.reduce((high, current) => {
						if (current.newCases > high) {
							// eslint-disable-next-line no-param-reassign
							high = current.newCases;
						}
						return high;
					}, 0);
					latest.stateCode = state.code;
					latest.isHigh = latest.newCases === latest.peak;
					latest.is14dayLow = _.every(cases.slice(-14), curr => {
						return latest.newCases <= curr.newCases;
					});
					latest.is14dayHigh = _.every(cases.slice(-14), curr => {
						return latest.newCases >= curr.newCases;
					});
					latest.movingAvg7daysData = cases.slice(-8).reduce((acc, curr) => {
						acc.push(curr.movingAvg7days);
						return acc;
					}, []);
					latest.movingAvg14daysData = cases.slice(-15).reduce((acc, curr) => {
						acc.push(curr.movingAvg7days);
						return acc;
					}, []);
					latest.newCases1to7days = cases.slice(-7).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.newCases8to14days = cases.slice(cases.length - 15, cases.length - 8).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.newCases15to21Days = cases.slice(cases.length - 22, cases.length - 15).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.newCases22to28Days = cases.slice(cases.length - 29, cases.length - 22).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.newCases14days = cases.slice(-14).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.prevNewCases14days = cases.slice(cases.length - 29, cases.length - 15).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
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
