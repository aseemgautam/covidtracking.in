import _ from 'lodash';
import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
	// const dataRequest = await fetch('https://api.covid19india.org/v4/data-all.json');
	// const data = await dataRequest.json();
	const {
		query: { state, district },
	} = req;
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
	res.end(`Post: ${state} ${district}`);
	// res.end(dates.toString());
};
