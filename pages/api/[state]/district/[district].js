import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import papa from 'papaparse';

export default async (req, res) => {
	// const dataRequest = await fetch('https://api.covid19india.org/v4/data-all.json');
	const dataRequest = await fetch('https://api.covid19india.org/v4/data.json');
	const data = await dataRequest.json();
	const {
		query: { state, district },
	} = req;
	let testsTotal = 0;
	const tests = [];
	// let testTweet = '';
	if (data) {
		Object.keys(data).forEach(key => {
			if (data[key].delta && data[key].delta.tested && data[key].meta.tested.last_updated === '2020-07-21') {
				testsTotal += data[key].delta.tested;
				tests.push({ state: key, tests: data[key].delta.tested });
			}
		});
	}
	console.log(testsTotal);
	// if (data) {
	// 	console.log(Object.keys(data));
	// }
	// const dates = [];
	// Object.keys(data).forEach(date => {
	// 	if (Object.keys(data[date]).some(stateCode => {
	// 		return stateCode.toLowerCase() === state;
	// 	})) {
	// 		if (data[date][state.toUpparCase].districts && data[date][state.toUpparCase].districts.disrict) {
	// 			dates.push(date);
	// 		}
	// 	}
	// });
	// console.log(dates);
	// res.end(`Post: ${state} ${district}`);
	res.end(JSON.stringify(tests));
	// res.end(papa.unparse(tests));
	// res.end(dates.toString());
};
