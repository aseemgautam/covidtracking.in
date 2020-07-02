class Colors {
	constructor() {
		this.yellow6 = '#fadb14';
		this.volcano6 = '#fa541c';
		this.orange6 = '#fa8c16';
		this.gold6 = '#faad14';
		this.red6 = '#f5222d';
		this.green1 = '#f6ffed';
		this.green2 = '#d9f7be';
		this.green6 = '#52c41a';
		this.green7 = '#389e0d';

		this.primary = '#2f54eb';
		this.chart = '#597ef7';
		this.chartSecondary = '#85a5ff';
		this.chartRed = '';

		this.newCasesStack = '#FFCC32';
		this.testingSampleStack = '#d9d9d9';
		this.monthlyNewCasesChart = ['#2171b5', '#4292c6', '#6baed6', '#9ecae1'];
	}

	getTrendColor = (rate, newCases) => {
		if (rate) {
			if (rate > 50 && newCases > 100) return '#cf1322';
			if (rate > 20 && newCases > 50) return '#fa541c';
			if (rate > 0 && newCases > 25) return '#faad14';
			return '#31a354';
		}
		return '#31a354';
	};
}

const colors = new Colors();
Object.freeze(colors);

export default colors;
