/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import CovidTests from '../public/covid-tests.json';
import CasesDistricts from '../public/cases-districts.json';
import DailyUpdates from '../public/daily-updates.json';
import CovidDataIndia from './CovidDataIndia';
import Colors from './Colors';

class Analytics {
	constructor() {
		this.cases = CovidDataIndia.cases;
		// STATE
		this.states = [];
		this.casesByState = new Map();
		this.casesByStateLatest = [];
		this.activeCasesPeak = [];
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
		// eslint-disable-next-line prefer-destructuring
		const todaysUpdate = _.last(DailyUpdates.sort(this.sortJsonByDateDesc));
		this.todaysUpdate = {
			date: todaysUpdate.date,
			updates: []
		};
		Object.keys(todaysUpdate).forEach(key => {
			if (key !== 'date') {
				todaysUpdate[key].forEach(value => {
					this.todaysUpdate.updates.push({ type: key, text: value });
				});
			}
		});
	}

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }

	round = num => {
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
				deathRate: curr.deaths > 5 ? this.round((curr.deaths * 100) / (curr.recovered + curr.deaths)) : '-'
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

	getProgressColorAndPercent = growthRate => {
		// let percent = growthRate;
		// if (growthRate) {
		// 	if (growthRate > 25) {
		// 		color = Colors.yellow6;
		// 		percent = 51;
		// 	} else if (growthRate > 0) {
		// 		color = Colors.green6;
		// 		percent = 25;
		// 	} else if (growthRate < 0) { color = Colors.green7; percent = 100; }
		// }
		return { color: Colors.getTrendColor(growthRate), percent: growthRate };
	}
}
const analytics = new Analytics();
Object.freeze(analytics);
export default analytics;
