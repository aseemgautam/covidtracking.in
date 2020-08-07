import papa from 'papaparse';
import Districts from '../../../classes/Districts';

export default async (req, res) => {
	const data = await Districts.latest();
	res.end(papa.unparse(data));
};
