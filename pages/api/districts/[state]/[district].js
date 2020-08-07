import papa from 'papaparse';
import Districts from '../../../../classes/Districts';

export default async (req, res) => {
	const {
		query: { state, district },
	} = req;
	res.end(papa.unparse(await Districts.single(state, district)));
	// res.end(`State: ${state} District: ${district}`);
};
