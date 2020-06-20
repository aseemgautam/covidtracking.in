import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Papa from 'papaparse';
import MovingAverage from './MovingAverage';
import IndianStates from '../public/india-states.json';

let instance = null;

class Cache {
	constructor() {
		if (!instance) {
			instance = this;
		}
		this._stateWise = new Map();
		this._stateWiseMostRecent = null;
		return instance;
	}

	fetchStateData = async () => {
		if (this._stateWise.Size > 0) {
			return this._stateWise;
		}
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
						return {
							...curr,
							newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
							newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
							newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
							active: curr.confirmed - curr.deaths - curr.recovered,
							newActive: idx === 0 ? 0 : (curr.confirmed - curr.deaths - curr.recovered)
							- (src[idx - 1].confirmed - src[idx - 1].deaths - src[idx - 1].recovered),
							deathRate: curr.deaths > 5 ? this.round((curr.deaths * 100) / (curr.recovered + curr.deaths)) : '-'
						};
					});
				MovingAverage.calculate(cases, 'newCases');
				this._stateWise.set(state.name, cases);
			}
		);
		return this.StateWise;
	}

	stateDataMostRecent = async () => {
		if (this._stateWiseMostRecent) {
			return this._stateWiseMostRecent;
		}
		await this.fetchStateData();
		this._stateWiseMostRecent = [];
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = this._stateWise.get(state.name);
				MovingAverage.calculate(cases, 'newCases');
				const latest = _.last(cases);
				if (latest) {
					latest.movingAvg7daysData = cases.slice(-8).map(data => {
						return {
							date: data.date,
							movingAverage: data.movingAvg7days
						};
					});
					latest.movingAvg14daysData = cases.slice(-15).map(data => {
						return {
							date: data.date,
							movingAverage: data.movingAvg7days
						};
					});
					latest.prevNewCases7days = cases.slice(cases.length - 15, cases.length - 8).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					latest.newCases7days = cases.slice(-7).reduce(
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
					this._stateWiseMostRecent.push(latest);
				}
			}
		);
		this._stateWiseMostRecent = _.orderBy(this._stateWiseMostRecent, ['confirmed'], ['desc']);
		return this._stateWiseMostRecent;
	}

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
}
const cache = new Cache();
export default cache;
