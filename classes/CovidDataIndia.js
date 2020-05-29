import CasesIndia from '../public/cases-india.json';
import CovidTests from '../public/covid-tests.json';

const IndiaPopulation = 1377122402;

class CovidDataIndia {
	constructor() {
		this.cases = CasesIndia.sort(this.sortJsonByDateDesc)
			.map((curr, idx, src) => {
				let rollingAvg7days = 0;
				let rollingAvg14days = 0;
				if (idx > 7) {
					rollingAvg7days = Math.round(src.slice(idx - 7, idx).reduce((prev, current) => {
						return prev + current.newCases;
					}, 0) / 7);
				}
				if (idx > 14) {
					rollingAvg14days = Math.round(src.slice(idx - 14, idx).reduce((prev, current) => {
						return prev + current.newCases;
					}, 0) / 14);
				}
				return {
					...curr,
					casesPer1L: curr.confirmed > 50
						? this.round((curr.confirmed * 100000) / IndiaPopulation) : '-',
					rollingAvg7days,
					rollingAvg14days,
				};
			}).map((curr, idx, src) => {
				let rollingAvg7daysRate = 0;
				let rollingAvg14daysRate = 0;
				if (idx > 14) {
					rollingAvg7daysRate = this.round(((src[idx].rollingAvg7days - src[idx - 7].rollingAvg7days)
						/ src[idx - 7].rollingAvg7days) * 100);
				}
				if (idx > 28) {
					rollingAvg14daysRate = this.round(((src[idx].rollingAvg14days - src[idx - 14].rollingAvg14days)
						/ src[idx - 14].rollingAvg14days) * 100);
				}
				return {
					...curr,
					rollingAvg7daysRate,
					rollingAvg14daysRate
				};
			}
			);
		this.latest = this.cases[this.cases.length - 1];
		this.deathRate = (this.latest.deaths / (this.latest.deaths + this.latest.recovered)) * 100;
		this.recoveryRate = (this.latest.recovered / this.latest.confirmed) * 100;
		this.casesPer1L = (this.latest.confirmed / IndiaPopulation) * 100000;
		this.testing = CovidTests;
	}

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
}

const data = new CovidDataIndia();
Object.freeze(data);

export default data;
