/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import CovidTests from '../public/covid-tests.json';
import CasesIndia from '../public/cases-india.json';
import AllCasesState from '../public/cases-india-statewise.json';
import IndiaStates from '../public/india-states.json';
import Statistic from './Statistic';
import HelpText from './HelpText';
import GetTrend from './Trend';

const IndiaPopulation = 1377122402;

class Analytics {
	constructor() {
		this.cases = CasesIndia.sort(this.sortJsonByDateDesc)
			.map((curr, idx, src) => {
				return {
					...curr,
					newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
					newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
					newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
					active: curr.confirmed - curr.deaths - curr.recovered
				};
			});

		// STATE
		this.states = [];
		this.casesByState = new Map();
		this.casesByStateLatest = [];
		this.activeCasesPeak = [];
		IndiaStates.states.forEach(element => {
			this.states.push({ name: element.name, code: element.code });
			const filtered = this.calculateNew(_.filter(AllCasesState, { state: element.name }));
			this.activeCasesPeak.push(_.maxBy(filtered, val => { return val.active; }));
			this.casesByState.set(element.name, filtered);
			if (filtered && filtered.length > 0) {
				this.casesByStateLatest.push(_.last(filtered));
			}
		});
		// console.log(CovidTests);
		this.testingData = [];

		CovidTests.sort(this.sortJsonByDateDesc).forEach(test => {
			this.testingData.push(
				{ date: test.date, type: 'Samples', value: test.newSamples },
				{ date: test.date, type: 'Positive', value: test.newPositive }
			);
		});
		this.activeCasesPeak = _.compact(this.activeCasesPeak);
		this.casesByStateLatest = _.orderBy(this.casesByStateLatest, ['confirmed'], ['desc']);
		// this.tests = CovidTests.
		// TRENDS
		const last2Days = this.cases.slice(-2);
		const trendValue = this.calculateTrend(7);

		const tests = CovidTests.sort(this.sortJsonByDateDesc).slice(-2);
		const fatalityRate = (last2Days[1].deaths / last2Days[1].confirmed) * 100;
		const casesPer1L = (last2Days[1].confirmed / IndiaPopulation) * 100000;
		this.confirmed = new Statistic('Confirmed', last2Days[1].confirmed,
			last2Days[1].newCases);
		this.active = new Statistic('Active', last2Days[1].active,
			last2Days[1].active - last2Days[0].active);
		this.deaths = new Statistic('Deaths', last2Days[1].deaths,
			last2Days[1].deaths - last2Days[0].deaths);
		this.recovered = new Statistic('Recovered', last2Days[1].recovered,
			last2Days[1].recovered - last2Days[0].recovered);
		this.fatalityRate = new Statistic('Death Rate', `${fatalityRate.toFixed(2)}%`);
		this.weeklyTrend = new Statistic('7 Days Trend',
			trendValue, GetTrend(trendValue), HelpText.weeklyTrend);
		this.casesPer1L = new Statistic('Cases Per 1L', casesPer1L, 'Very Low');
		this.tests = new Statistic('Samples Tested', tests[1].samples,
			tests[1].samples - tests[0].samples);
	}

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }

	calculateNew = casesArray => {
		return casesArray.map((curr, idx, src) => {
			return {
				...curr,
				// date: new Date(curr.date),
				newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
				newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
				newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
				active: curr.confirmed - curr.deaths - curr.recovered
			};
		});
	}

	calculateTrend = days => {
		const current = this.cases.slice(-days).reduce(
			(acc, curr) => {
				return acc + curr.newCases;
			}, 0);
		const previous = this.cases.slice(-days * 2, -days).reduce(
			(acc, curr) => {
				return acc + curr.newCases;
			}, 0);
		return current - previous;
	}

	getMapColor = count => {
		if (count > 4000) return '#b30000';
		if (count > 3000) return '#e34a33';
		if (count > 2000) return '#fc8d59';
		if (count > 1000) return '#fdbb84';
		if (count > 500) return '#fdd49e';
		if (count > 200) return '#fef0d9';
		if (count > 50) return '#addd8e';
		return '#addd8e';
	}

	topNAffected = topn => {
		return _.map(_.takeRight(_.sortBy(this.casesByStateLatest, ['active']), topn), 'state');
	}

	stateGrowth = (days, states) => {
		const date = new Date();
		date.setDate(date.getDate() - days);
		const cases = [];
		if (Array.isArray(states) && states.length > 0) {
			const sorted = this.orderStatesByActiveCases(states);
			sorted.forEach(state => {
				cases.push(..._.filter(this.casesByState.get(state),
					val => { return new Date(val.date) >= date; }));
			});
		}

		return cases;
	}

	orderStatesByActiveCases = states => {
		if (Array.isArray(states) && states.length > 0) {
			// this.casesByStateLatest is already sorted
			const partition = _.partition(this.casesByStateLatest,
				val => { return _.includes(states, val.state); });
			if (partition.length === 2) {
				return partition[0].map(val => { return val.state; });
			}
		}
		return [];
	}

	groupBy = (field, srcArray) => {
		return srcArray.reduce(
			(acc, curr) => {
				const fieldValue = curr[field];
				acc[fieldValue] = (acc[fieldValue] || []).concat(curr);
				return acc;
			}, {}
		);
	}
}

const analytics = new Analytics();
Object.freeze(analytics);
export default analytics;
