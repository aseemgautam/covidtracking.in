import Papa from 'papaparse';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import MovingAverage from './MovingAverage';
import DailyStatistic from './DailyStatistic';

// const IndiaPopulation = 1377122402;

class CovidDataIndia {
	async fetchTests() {
		// eslint-disable-next-line max-len
		const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRyjPj_VXGIOYnCy5eoy3YcN9yA_yFKWd4AdkMXFam62N4Ik-D6A6cwFXt2N2LwpncJEd-dFn7s5Ez/pub?gid=1316013292&single=true&output=csv');
		const csv = await res.text();
		return this.parseCsv(csv);
	}

	async fetchDataIndia() {
		// eslint-disable-next-line max-len
		const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRyjPj_VXGIOYnCy5eoy3YcN9yA_yFKWd4AdkMXFam62N4Ik-D6A6cwFXt2N2LwpncJEd-dFn7s5Ez/pub?gid=1890719073&single=true&output=csv');
		const csv = await res.text();
		const cases = this.parseCsv(csv);

		const testingData = await this.fetchTests();

		const data = cases.map(value => {
			const dailyTests = _.find(testingData, ['date', value.date]);
			let tests = 0; let newTests = 0;
			if (dailyTests) {
				tests = dailyTests.samples;
				newTests = dailyTests.newSamples;
			}
			return new DailyStatistic(value.date, value.confirmed, value.newCases,
				value.active, value.newActive,
				value.recovered, value.newRecover, value.deaths, value.newDeaths, tests,
				newTests);
		});

		MovingAverage.calculate(data, 'newCases');
		MovingAverage.for7days(data, 'newTests', 'newTests7DayMA', true);
		MovingAverage.for7days(data, 'dailyPositivity', 'dailyPositivity7DayMA', false);
		return JSON.parse(JSON.stringify(data));
	}

	// eslint-disable-next-line class-methods-use-this
	parseCsv(text) {
		return Papa.parse(text, {
			header: true,
			dynamicTyping: true
		}).data;
	}
}

export default CovidDataIndia;
