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
