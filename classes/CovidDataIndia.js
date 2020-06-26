import Papa from 'papaparse';
import fetch from 'isomorphic-unfetch';
import MovingAverage from './MovingAverage';

const IndiaPopulation = 1377122402;

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
		const latest = cases[cases.length - 1];
		const deathRate = (latest.deaths / (latest.deaths + latest.recovered)) * 100;
		const recoveryRate = (latest.recovered / latest.confirmed) * 100;
		const casesPer1L = (latest.confirmed / IndiaPopulation) * 100000;
		MovingAverage.calculate(cases, 'newCases');
		return { cases, latest, deathRate, recoveryRate, casesPer1L };
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
