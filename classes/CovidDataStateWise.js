import _ from 'lodash';
import MovingAverage from './MovingAverage';
import CasesIndiaStatewise from '../public/cases-india-statewise.json';
import IndianStates from '../public/india-states.json';

class CovidDataStateWise {
	constructor() {
		this.cases = new Map();
		this.latest = [];
		IndianStates.states.forEach( // loop all states
			state => {
				const cases = _.filter(CasesIndiaStatewise, { state: state.name })
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
				const latest = _.last(cases);
				if (latest) {
					latest.movingAvg7daysData = cases.slice(-7).map(curr => {
						return {
							date: curr.date,
							movingAverage: curr.movingAvg7days
						};
					});
					latest.movingAvg14daysData = cases.slice(-14).map(curr => {
						return {
							date: curr.date,
							movingAverage: curr.movingAvg7days
						};
					});
					latest.prevNewCases7days = cases.slice(cases.length - 14, cases.length - 7).reduce(
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
					latest.prevNewCases14days = cases.slice(cases.length - 28, cases.length - 14).reduce(
						(acc, curr) => {
							return acc + curr.newCases;
						}, 0);
					this.latest.push(latest);
				}
				this.cases.set(state.name, cases);
			}
		);
		this.latest = _.orderBy(this.latest, ['confirmed'], ['desc']);
	}

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	getLatest = stateName => {
		return _.last(this.cases.get(stateName));
	}

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }
}

const data = new CovidDataStateWise();
Object.freeze(data);

export default data;
