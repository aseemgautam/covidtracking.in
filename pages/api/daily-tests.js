/* eslint-disable no-console */
import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import papa from 'papaparse';
import Utils from '../../classes/Utils';

export default async (req, res) => {
	const dataRequest = await fetch('https://api.covid19india.org/v4/data.json');
	const data = await dataRequest.json();

	let testsTotal = 0;
	const tests = [];
	let testTweet = '';
	if (data) {
		Object.keys(data).forEach(key => {
			if (data[key].delta && data[key].delta.tested && data[key].meta.tested.last_updated
				=== (new Date()).toISOString().split('T')[0]) {
				testsTotal += data[key].delta.tested;
				if (data[key].delta.tested > 10000) {
					testTweet += `${key} +${data[key].delta.tested},`;
				}
				tests.push({
					state: key,
					tests: data[key].delta.tested,
					'Tests (in Thousands, 000s)': Utils.round(data[key].delta.tested / 1000)
				});
			}
		});
	}
	console.log(testsTotal);
	console.log(testTweet);
	res.end(papa.unparse(tests));
};
