import papa from 'papaparse';
import _ from 'lodash';
import Districts from '../../classes/Districts';
import CovidDataIndia from '../../classes/CovidDataIndia';

export default async (req, res) => {
	const latest = await Districts.latest();
	// eslint-disable-next-line no-underscore-dangle
	// const data = await Districts._fetch();
	const sorted = _.orderBy(latest, ['newCases'], ['desc']);
	const top10 = _.take(sorted, 50);
	res.end(papa.unparse(top10));
};
