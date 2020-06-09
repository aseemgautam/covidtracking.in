import MovingAverage from './MovingAverage';
import CasesIndia from '../public/cases-india.json';
import CasesIndiaStatewise from '../public/cases-india-statewise.json';
import CovidTests from '../public/covid-tests.json';

const IndiaPopulation = 1377122402;

class CovidDataIndia {
	constructor() {
		this.cases = CasesIndia;
		this.casesStatewise = CasesIndiaStatewise;
		MovingAverage.calculate(this.cases, 'newCases');

		this.latest = this.cases[this.cases.length - 1];
		this.deathRate = (this.latest.deaths / (this.latest.deaths + this.latest.recovered)) * 100;
		this.recoveryRate = (this.latest.recovered / this.latest.confirmed) * 100;
		this.casesPer1L = (this.latest.confirmed / IndiaPopulation) * 100000;
		this.testing = CovidTests;
	}

	sortJsonByDateDesc = (a, b) => { return new Date(a.date) - new Date(b.date); }
}

const data = new CovidDataIndia();
Object.freeze(data);

export default data;
