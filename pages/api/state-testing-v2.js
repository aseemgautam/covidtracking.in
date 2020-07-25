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
		result.State = current.state;
		const posRateDelta = (current.positivePercent - _.nth(stateData, -14).positivePercent).toFixed(2);
		let posRateTrend;
		if (posRateDelta > 0.5) {
			posRateTrend = `increasing +${posRateDelta}`;
		} else if (posRateDelta < -0.5) {
			posRateTrend = `decreasing ${posRateDelta}`;
		} else {
			posRateTrend = 'flat';
		}
		result['POSITIVITY RATE'] = `${current.positivePercent}^${posRateTrend}^`;
		result.posRate14 = _.nth(stateData, -14).positivePercent;
		result.posRate13 = _.nth(stateData, -13).positivePercent;
		result.posRate11 = _.nth(stateData, -11).positivePercent;
		result.posRate9 = _.nth(stateData, -9).positivePercent;
		result.posRate7 = _.nth(stateData, -7).positivePercent;
		result.posRate5 = _.nth(stateData, -5).positivePercent;
		result.posRate3 = _.nth(stateData, -3).positivePercent;
		result.posRate = current.positivePercent;

		const dailyTestsDelta = _.last(testingData).movingAverage - _.nth(testingData, -14).movingAverage;
		let dailyTestsTrend;
		if (dailyTestsDelta > (_.nth(testingData, -14).movingAverage * 0.1)) {
			dailyTestsTrend = `Increasing +${dailyTestsDelta}`;
		} else if (Math.abs(dailyTestsDelta) < (_.nth(testingData, -14).movingAverage * 0.1)) {
			dailyTestsTrend = `Decreasing ${dailyTestsDelta}`;
		} else {
			dailyTestsTrend = 'flat';
		}
		result['TESTS DAILY (7-DAY AVG)'] = `${_.last(testingData).movingAverage}^${dailyTestsTrend}^`;
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
};
