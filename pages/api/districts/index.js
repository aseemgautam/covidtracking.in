import papa from 'papaparse';
import Districts from '../../../classes/Districts';
import Colors from '../../../classes/Colors';

export default async (req, res) => {
	const data = await Districts.latest();
	const result = data.map(district => {
		return {
			DISTRICT: district.district,
			'TREND COLOR': Colors.getTrendColorByName(district.movingAvg14daysRate),
			STATE: district.state,
			'COVID+ GROWTH (14 DAYS)': district.movingAvg14daysRate,
			ma14: district.ma14,
			ma13: district.ma13,
			ma11: district.ma11,
			ma9: district.ma9,
			ma7: district.ma7,
			ma5: district.ma5,
			ma3: district.ma3,
			ma0: district.ma0,
			CASES: district.confirmed,
			RECOVR: district.recovered,
			DEATHS: district.deaths,
			'DEATH RATE': district.deathRate,
			'Deaths P Million': district.deathsPerMillion,
			'Cases (7 Days)': district.casesInLast7Days,
			'Cases P Million (7 Days)': district.casesPerMillionLast7Days,
			'Cases P Million': district.casesPerMillion,
		};
	});
	res.end(papa.unparse(result));
};
