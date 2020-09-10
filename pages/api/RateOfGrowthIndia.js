import papa from 'papaparse';
import _ from 'lodash';
import CovidDataIndia from '../../classes/CovidDataIndia';

export default async (req, res) => {
	const data = await (new CovidDataIndia()).fetchDataIndia();
	res.end(papa.unparse(data.cases.map(record => {
		return {
			date: record.date, 'rate of growth': record.movingAvg14daysRate
		};
	})));
};
