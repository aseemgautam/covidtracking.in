import papa from 'papaparse';
import _ from 'lodash';
import Districts from '../../../classes/Districts';

export default async (req, res) => {
	const data = await Districts.duplicates();
	const districts = _.map(data, 'district');
	const sorted = districts.slice().sort();
	const duplicates = [];
	for (let i = 0; i < sorted.length - 1; i++) {
		if (sorted[i + 1] == [sorted[i]]) {
			duplicates.push(sorted[i]);
		}
	}
	res.end(papa.unparse(data));
	// res.end(JSON.stringify(duplicates));
	// res.end(JSON.stringify(districts));
};

// ["Aurangabad (MH, BR)","Balrampur (UP, CG)","Bilaspur (HP, CG)","Hamirpur (UP, HP)","Pratapgarh (RJ, UP"]
