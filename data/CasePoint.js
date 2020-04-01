export default class CasePoint {
	constructor(date, total, newCases, newDeaths, active, recov, deaths) {
		this.date = date;
		this.total = total;
		this.newCases = newCases;
		this.newDeaths = newDeaths;
		this.active = active;
		this.recov = recov;
		this.deaths = deaths;
	}
}

const cases = [
	new CasePoint(new Date(2020, 4, 1), 1637, 240, 3, 1466, 133, 38),
	new CasePoint(new Date(2020, 3, 31), 1397, 146, 3, 1239, 123, 35),
	new CasePoint(new Date(2020, 3, 30), 1024, 37, 5, 1117, 0, 32)
];

export { cases };
