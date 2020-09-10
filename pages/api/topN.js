/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import papa from 'papaparse';
import _ from 'lodash';
import Districts from '../../classes/Districts';
import CovidDataIndia from '../../classes/CovidDataIndia';

function getTopN(from, to, latest, districtData) {
	const sorted = _.orderBy(latest, ['confirmed'], ['desc']);
	let day0 = 0; let day1 = 0; let day2 = 0; let day3 = 0;
	sorted.slice(from, to).forEach(curr => {
		day0 += _.nth(_.filter(districtData, { district: curr.district, state: curr.state }), -1).newCases;
		day1 += _.nth(_.filter(districtData, { district: curr.district, state: curr.state }), -2).newCases;
		day2 += _.nth(_.filter(districtData, { district: curr.district, state: curr.state }), -3).newCases;
		day3 += _.nth(_.filter(districtData, { district: curr.district, state: curr.state }), -4).newCases;
	});
	const sum = sorted.slice(from, to).reduce((acc, curr) => {
		return acc + curr.confirmed;
	}, 0);
	return {
		District: `${from}-${to}`,
		Overall: sum,
		Today: day0,
		Yesterday: day1,
		'2 Days Ago': day2,
		'3 Days Ago': day3
	};
}

export default async (req, res) => {
	const latest = await Districts.latest();
	const data = await Districts._fetch();
	const india = await (new CovidDataIndia()).fetchDataIndia();
	const top = getTopN(0, 10, latest, data);
	const next10 = getTopN(11, 20, latest, data);
	const next20 = getTopN(21, 30, latest, data);
	const next30 = getTopN(31, 40, latest, data);
	const rest = {
		District: 'rest',
		Overall: _.nth(india.cases, -1).confirmed - top.Overall - next10.Overall - next20.Overall - next30.Overall,
		Yesterday: _.nth(india.cases, -1).newCases - top.Yesterday - next10.Yesterday - next20.Yesterday - next30.Yesterday,
		'2 Days Ago': _.nth(india.cases, -2).newCases - top['2 Days Ago'] - next10['2 Days Ago'] - next20['2 Days Ago'] - next30['2 Days Ago'],
		'3 Days Ago': _.nth(india.cases, -3).newCases - top['3 Days Ago'] - next10['3 Days Ago'] - next20['3 Days Ago'] - next30['3 Days Ago']
	};
	res.end(papa.unparse([
		top, next10, next20, next30, rest
		// {
		// 	district: '11-20',
		// 	total: top2
		// },
		// {
		// 	district: '21-30',
		// 	total: top3
		// },
		// {
		// 	district: '31-40',
		// 	total: top4
		// },
		// {
		// 	district: 'Rest',
		// 	total: total - (top1 + top2 + top3 + top4)
		// }
	]));
};
