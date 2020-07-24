import _ from 'lodash';
import papa from 'papaparse';
import CovidDataState from '../../classes/CovidDataState';

export default async (req, res) => {
	const stateDataLatest = await CovidDataState.latest();
	const response = [];
	stateDataLatest.forEach(stateData => {
		response.push(_.pick(stateData, ['state', 'tests', 'positivePercent', 'testsPerMillion']));
	});
	// res.end(JSON.stringify(stateDataLatest));
	res.end(JSON.stringify(papa.unparse(response)));
};
