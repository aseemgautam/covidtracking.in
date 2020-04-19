/* eslint-disable no-restricted-syntax */
import CovidTests from '../public/covid-tests.json';
import CasesIndia from '../public/cases-india.json';
import CasesStatewise from '../public/cases-india-statewise.json';
import Statistic from './Statistic';
import HelpText from './HelpText';
import GetTrend from './Trend';

const IndiaPopulation = 1377122402;

class Analytics {
	constructor() {
		this.cases = CasesIndia.sort(this.sortJson)
			.map((curr, idx, src) => {
				return {
					...curr,
					newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
					newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
					newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
					active: curr.confirmed - curr.deaths - curr.recovered
				};
			});
		this.casesByState = this.groupBy('state', CasesStatewise);
		for (const key in this.casesByState) {
			if (Object.prototype.hasOwnProperty.call(this.casesByState, key)
			&& Array.isArray(this.casesByState[key])) {
				this.casesByState[key] = this.casesByState[key]
					.map((curr, idx, src) => {
						return {
							...curr,
							newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
							active: curr.confirmed - curr.deaths - curr.recovered
						};
					});
			}
		}
		const last2Days = this.cases.slice(-2);
		const trendValue = this.calculateTrend(7);

		const tests = CovidTests.sort(this.sortJson).slice(-2);
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

	sortJson = (a, b) => { return new Date(a.date) - new Date(b.date); }

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
		if (count < 30) return '#addd8e';
		if (count < 100) return '#fef0d9';
		if (count < 200) return '#fdd49e';
		if (count < 500) return '#fdbb84';
		if (count < 1000) return '#fc8d59';
		if (count < 2000) return '#e34a33';
		if (count < 5000) return '#b30000';
		return '#addd8e';
	}

	statewiseLatest = () => {
		let cases = [];
		for (const [, v] of Object.entries(this.casesByState)) {
			v[v.length - 1].color = this.getMapColor(v[v.length - 1].confirmed);
			cases.push(v[v.length - 1]);
		}
		cases = cases.sort((a, b) => { return b.confirmed - a.confirmed; });
		return cases;
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
