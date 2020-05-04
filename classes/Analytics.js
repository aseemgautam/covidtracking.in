/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import CovidTests from '../public/covid-tests.json';
import CasesIndia from '../public/cases-india.json';
import AllCasesState from '../public/cases-india-statewise.json';
import IndiaStates from '../public/india-states.json';
import CasesDistricts from '../public/cases-districts.json';
import Statistic from './Statistic';
import HelpText from './HelpText';
import GetTrend from './Trend';

const IndiaPopulation = 1377122402;

class Analytics {
	constructor() {
		this.cases = CasesIndia.sort(this.sortJsonByDateDesc);

		// STATE
		this.states = [];
		this.casesByState = new Map();
		this.casesByStateLatest = [];
		this.activeCasesPeak = [];
		IndiaStates.states.forEach(element => {
			this.states.push({ name: element.name, code: element.code });
			const filtered = this.calculateNew(_.filter(AllCasesState, { state: element.name }))
				.map((curr, idx, src) => {
					let rateOfInc7days = '-';
					let activeDelta = 0;
					if (idx > 7 && src[idx - 7].active > 0) {
						activeDelta = curr.active - src[idx - 7].active;
						rateOfInc7days = (activeDelta * 100) / src[idx - 7].active;
					}
					return {
						...curr,
						casesPer1L: curr.confirmed > 50
							? this.roundToTwoDigits((curr.confirmed * 100000) / element.population) : '-',
						rateOfInc7days: this.roundToTwoDigits(rateOfInc7days),
						activeDelta,
						active7daysAgo: idx > 7 ? src[idx - 7].active : 0
					};
				});
			this.activeCasesPeak.push(_.maxBy(filtered, val => { return val.active; }));
			this.casesByState.set(element.name, filtered);
			if (filtered && filtered.length > 0) {
				this.casesByStateLatest.push(_.last(filtered));
			}
		});
		this.testingData = [];
		CovidTests.sort(this.sortJsonByDateDesc).forEach(test => {
			this.testingData.push(
				{ date: test.date, type: 'Samples', value: test.newSamples },
				{ date: test.date,
					type: 'Positive',
					value: test.newPositive,
					percent: Math.round((test.percentPositive + Number.EPSILON) * 100) / 100
				}
			);
		});
		this.activeCasesPeak = _.compact(this.activeCasesPeak);
		this.casesByStateLatest = _.orderBy(this.casesByStateLatest, ['confirmed'], ['desc']);
		this.districts = _.orderBy(CasesDistricts, ['confirmed'], ['desc']).slice(0, 10);
		this.casesForCalendarActiveGrowth = this.cases
			.map(val => {
				return {
					percent: val.percentIncActive,
					date: val.date,
					newActive: val.newActive,
					'New Active Cases': val.newActive,
					'% inc from day before': `${val.percentIncActive}%`,
					active: val.active
				};
			});

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

		[{ x: 1 }, { x: 2 }, { x: 3 }].reduce((accumulator, currentValue) => {
			return accumulator + currentValue.x;
		}, 0);
	}

	// calculatePercentageIncNDays = arrayN => {
	// 	if (!Array.isArray(arrayN) || arrayN.length <= 1) return '-';

	// }

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }

	roundToTwoDigits = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	calculateNew = casesArray => {
		return casesArray.map((curr, idx, src) => {
			return {
				...curr,
				// date: new Date(curr.date),
				newCases: idx === 0 ? 0 : curr.confirmed - src[idx - 1].confirmed,
				newRecover: idx === 0 ? 0 : curr.recovered - src[idx - 1].recovered,
				newDeaths: idx === 0 ? 0 : curr.deaths - src[idx - 1].deaths,
				active: curr.confirmed - curr.deaths - curr.recovered,
				newActive: idx === 0 ? 0 : (curr.confirmed - curr.deaths - curr.recovered)
				- (src[idx - 1].confirmed - src[idx - 1].deaths - src[idx - 1].recovered),
				deathRate: curr.deaths > 10 ? this.roundToTwoDigits((curr.deaths * 100) / curr.confirmed) : '-'
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
		if (count > 6400) return '#b30000';
		if (count > 3200) return '#e34a33';
		if (count > 1600) return '#fc8d59';
		if (count > 800) return '#fdbb84';
		if (count > 400) return '#fdd49e';
		if (count > 200) return '#c7e9c0';
		if (count > 100) return '#74c476';
		return '#74c476';
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
