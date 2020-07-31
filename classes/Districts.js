import _ from 'lodash';
import fetch from 'isomorphic-unfetch';

let instance = null;

class Districts {
	constructor() {
		if (!instance) {
			instance = this;
		}

		this._all = null;
		this._latest = null;
		return instance;
	}

	all = async () => {
		if (this._stateTestingData) return this._stateTestingData;

		const res = await fetch('https://api.covid19india.org/csv/latest/districts.csv');
		const json = await res.json();
		this._all = [];
	}
}

const districts = new Districts();
export default districts;
