import papa from 'papaparse';
import Districts from '../../classes/Districts';
import Colors from '../../classes/Colors';

export default async (req, res) => {
	const data = await Districts.latest();
	const result = data.map(district => {
		return {
			name: district.district,
			// 'TREND COLOR': Colors.getTrendColorByName(district.movingAvg14daysRate),
			// STATE: district.state,
			// 'COVID+ GROWTH (14 DAYS)': district.movingAvg14daysRate,
			// CASES: district.confirmed,
			// RECOVR: district.recovered,
			// DEATHS: district.deaths,
			// 'DEATH RATE': district.deathRate,
			// 'Cases (7 Days)': district.casesInLast7Days,
			'Cases P Million (7 Days)': district.casesPerMillionLast7Days,
			// 'Cases P Million': district.casesPerMillion
		};
	});
	res.end(papa.unparse(result));
};
