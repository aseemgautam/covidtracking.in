import papa from 'papaparse';
import Districts from '../../../../../classes/Districts';

export default async (req, res) => {
	const {
		query: { state, district },
	} = req;
	const peakData = (await Districts.single(state, district)).map(record => {
		return {
			Date: record.date,
			'New Cases 7 Day MA': record.newCases7DayMA,
			'Recoveries 7 Day MA': record.newRecovered7DayMA,
			Peak: record.newCases7DayMA - record.newRecovered7DayMA
		};
	});
	// res.end(`State: ${state} District: ${district}`);
	res.end(papa.unparse(peakData));
};
