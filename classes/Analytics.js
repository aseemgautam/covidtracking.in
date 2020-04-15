import CovidTests from '../public/covid-tests.json';
import Cases from '../public/cases-india.json';
// import CasesStatewise from '../public/cases-india-statewise.json';
import Statistic from './Statistic';
import HelpText from './HelpText';

const IndiaPopulation = 1377122402;

class Analytics {
	constructor() {
		const cases = Cases.sort(this.sortJson).slice(-2)
			.map(curr => {
				return {
					...curr,
					active: curr.confirmed - curr.deaths - curr.recovered
				};
			});

		const tests = CovidTests.sort(this.sortJson).slice(-2);
		const fatalityRate = (cases[1].deaths / cases[1].confirmed) * 100;
		const casesPer1L = (cases[1].confirmed / IndiaPopulation) * 100000;
		this.confirmed = new Statistic('Confirmed', cases[1].confirmed,
			cases[1].confirmed - cases[0].confirmed);
		this.active = new Statistic('Active', cases[1].active,
			cases[1].active - cases[0].active);
		this.deaths = new Statistic('Deaths', cases[1].deaths,
			cases[1].deaths - cases[0].deaths);
		this.recovered = new Statistic('Recovered', cases[1].recovered,
			cases[1].recovered - cases[0].recovered);
		this.fatalityRate = new Statistic('Death Rate', `${fatalityRate.toFixed(2)}%`);
		this.weeklyTrend = new Statistic('7 Days Trend', 6781, 567, HelpText.weeklyTrend);
		this.casesPer1L = new Statistic('Cases Per 1L', casesPer1L, 'Very Low');
		this.tests = new Statistic('Samples Tested', tests[1].samples,
			tests[1].samples - tests[0].samples);
	}

	sortJson = (a, b) => { return new Date(a.date) - new Date(b.date); }
	// fatalityRate()
}

const analytics = new Analytics();
Object.freeze(analytics);
export default analytics;
