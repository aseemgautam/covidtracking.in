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
		const posRateDelta = (current.positivePercent - _.nth(stateData, -14).positivePercent).toFixed(2);
		let posRateTrend;
		if (posRateDelta > 0.5) {
			posRateTrend = `Up +${posRateDelta}%`;
			result.posRateColor = 'red';
		} else if (posRateDelta < -0.5) {
			posRateTrend = `Down ${posRateDelta}%`;
			result.posRateColor = 'green';
		} else {
			posRateTrend = 'Flat';
			result.posRateColor = 'default';
		}
		result['POSITIVITY RATE'] = `${current.positivePercent}% ^${posRateTrend}^`;
		result.movingAvg14daysRate = current.movingAvg14daysRate;
		result.trendColor = current.trendColor;
		result.posRate14 = _.nth(stateData, -14).positivePercent;
		result.posRate13 = _.nth(stateData, -13).positivePercent;
		result.posRate11 = _.nth(stateData, -11).positivePercent;
		result.posRate9 = _.nth(stateData, -9).positivePercent;
		result.posRate7 = _.nth(stateData, -7).positivePercent;
		result.posRate5 = _.nth(stateData, -5).positivePercent;
		result.posRate3 = _.nth(stateData, -3).positivePercent;
		result.posRate = current.positivePercent;
		const dailyTestsDelta = _.last(testingData).movingAverage - _.nth(testingData, -14).movingAverage;
		const dailyTestsDeltaPercent = (Math.abs(dailyTestsDelta * 100) / _.nth(testingData, -14).movingAverage).toFixed(2);
		let dailyTestsTrend;
		if (dailyTestsDelta > 0 && dailyTestsDelta > (_.nth(testingData, -14).movingAverage * 0.1)) {
			dailyTestsTrend = `Up +${dailyTestsDeltaPercent}%`;
			result.dailyTestsTrendColor = 'green';
		} else if (dailyTestsDelta < 0 && Math.abs(dailyTestsDelta) > (_.nth(testingData, -14).movingAverage * 0.1)) {
			dailyTestsTrend = `Down ${dailyTestsDeltaPercent}%`;
			result.dailyTestsTrendColor = 'red';
		} else {
			dailyTestsTrend = 'Flat';
			result.dailyTestsTrendColor = 'default';
		}
		result['DAILY TESTS (14 DAY TREND)'] = `${_.last(testingData).movingAverage.toLocaleString()}^${dailyTestsTrend}^`;
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
