import _ from 'lodash';
import papa from 'papaparse';
import CovidDataState from '../../classes/CovidDataState';
// import CovidDataTesting from '../../classes/CovidDataTesting';

export default async (req, res) => {
	const stateDataLatest = await CovidDataState.latest();
	const response = [];
	stateDataLatest.forEach(stateData => {
		response.push(_.pick(stateData, ['state', 'population', 'positivePercent', 'tests', 'testsPerMillion']));
	});
	// res.end(JSON.stringify(await CovidDataTesting.all()));
	// res.end(JSON.stringify(_.filter(await CovidDataTesting.all(), { state: 'Dadra and Nagar Haveli' })));
	res.end(papa.unparse(response));
};
