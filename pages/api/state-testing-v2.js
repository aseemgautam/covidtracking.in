import _ from 'lodash';
import papa from 'papaparse';
import CovidDataState from '../../classes/CovidDataState';
import CovidDataTesting from '../../classes/CovidDataTesting';

export default async (req, res) => {
	const stateDataLatest = await CovidDataState.latest();
	const stateDataAll = await CovidDataState.all();
	const stateDataTesting = await CovidDataTesting.all();

	const response = [];
	stateDataLatest.forEach(current => {
		const stateData = stateDataAll.get(current.state);
		const testingData = _.filter(stateDataTesting, { state: current.state });
		const result = {};
		result.STATE = current.state;
		const posRateDelta = (current.dailyPositive7DayMA - _.nth(stateData, -14).dailyPositive7DayMA).toFixed(2);
		let posRateTrend;
		if (posRateDelta > 0.5) {
			posRateTrend = `Increasing +${posRateDelta}%`;
			result.posRateColor = 'red';
		} else if (posRateDelta < -0.5) {
			posRateTrend = `Decreasing ${posRateDelta}%`;
			result.posRateColor = 'green';
		} else {
			posRateTrend = 'Flat';
			result.posRateColor = 'default';
		}
		result['POSITIVITY RATE'] = `${current.positivity}% ^${posRateTrend}^`;
		result['AVG NEW CASES/DAY'] = current.movingAvg14daysRate;
		result.trendColor = current.trendColor;
		result.posRate14 = _.nth(stateData, -14).dailyPositive7DayMA;
		result.posRate13 = _.nth(stateData, -13).dailyPositive7DayMA;
		result.posRate11 = _.nth(stateData, -11).dailyPositive7DayMA;
		result.posRate9 = _.nth(stateData, -9).dailyPositive7DayMA;
		result.posRate7 = _.nth(stateData, -7).dailyPositive7DayMA;
		result.posRate5 = _.nth(stateData, -5).dailyPositive7DayMA;
		result.posRate3 = _.nth(stateData, -3).dailyPositive7DayMA;
		result.posRate = current.dailyPositive7DayMA;
		const dailyTestsDelta = _.last(testingData).movingAverage - _.nth(testingData, -14).movingAverage;
		const dailyTestsDeltaPercent = (Math.abs(dailyTestsDelta * 100) / _.nth(testingData, -14).movingAverage).toFixed(2);
		let dailyTestsTrend;
		if (dailyTestsDelta > 0 && dailyTestsDelta > (_.nth(testingData, -14).movingAverage * 0.1)) {
			dailyTestsTrend = `Up +${dailyTestsDeltaPercent}%`;
			result.dailyTestsTrendColor = 'green';
		} else if (dailyTestsDelta < 0 && Math.abs(dailyTestsDelta) > (_.nth(testingData, -14).movingAverage * 0.05)) {
			dailyTestsTrend = `Down ${dailyTestsDeltaPercent}%`;
			result.dailyTestsTrendColor = 'red';
		} else {
			dailyTestsTrend = 'Flat';
			result.dailyTestsTrendColor = 'default';
		}
		result['AVG NEW TESTS/DAY'] = `${_.last(testingData).movingAverage.toLocaleString()}^${dailyTestsTrend}^`;
		result.ma14 = _.nth(testingData, -14).movingAverage;
		result.ma11 = _.nth(testingData, -11).movingAverage;
		result.ma9 = _.nth(testingData, -9).movingAverage;
		result.ma7 = _.nth(testingData, -7).movingAverage;
		result.ma5 = _.nth(testingData, -5).movingAverage;
		result.ma3 = _.nth(testingData, -3).movingAverage;
		result.ma = _.last(testingData).movingAverage;
		result['TOTAL TESTS'] = current.tests;
		result['TESTS PER MILLION'] = current.testsPerMillion;
		response.push(result);
	});
	res.end(papa.unparse(response));
	// res.end(JSON.stringify(response));
};
