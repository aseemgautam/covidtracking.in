class DailyStatistic {
	constructor(date, cases, newCases, active, newActive, recovered, newRecovered,
		deaths, newDeaths, tests, newTests) {
		this.date = date;
		this.confirmed = cases;
		this.newCases = newCases;
		this.active = active;
		this.newActive = newActive;
		this.recovered = recovered;
		this.newRecover = newRecovered;
		this.recoveryRate = parseFloat(((recovered * 100) / cases).toFixed(2));
		this.deaths = deaths;
		this.newDeaths = newDeaths;
		this.deathRate = parseFloat(((deaths * 100) / (deaths + recovered)).toFixed(2));
		this.dailyDeathRate = parseFloat(((newDeaths * 100) / (newDeaths + newRecovered)).toFixed(2));
		this.tests = tests;
		this.newTests = newTests;
		this.positivity = tests > 0 ? parseFloat(((cases * 100) / tests).toFixed(2)) : 0;
		this.dailyPositivity = newTests > 0 ? parseFloat(((newCases * 100) / newTests).toFixed(2)) : 0;
	}
}

export default DailyStatistic;
