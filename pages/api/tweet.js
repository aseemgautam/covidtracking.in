import _ from 'lodash';
import CovidDataState from '../../classes/CovidDataState';
import Utils from '../../classes/Utils';

export default async (req, res) => {
	let twtHigh = ''; let newHighs = 0;
	let newCases = 0; let newRecover = 0; let newDeaths = 0; let newTests = 0;
	const casesByStateLatest = await CovidDataState.latest();
	const cases = _.orderBy(casesByStateLatest, ['newCases'], ['desc']);
	cases.forEach(state => {
		if (state.newCases > 0 || state.newRecover > 0 || state.newDeaths > 0) {
			if (state.isHigh) {
				newHighs++;
				twtHigh += `${state.stateCode} +${state.newCases}, `;
			}
			newCases += state.newCases; newRecover += state.newRecover;
			newDeaths += state.newDeaths; newTests += state.newTests;
		}
	});
	const positivity = ((newCases * 100) / newTests).toFixed(2);
	const day = Utils.shortDateAndMonth(new Date());
	const line1 = `#CoronavirusIndia ${day} Bulletin`;
	// eslint-disable-next-line max-len
	const line2 = `Cases +${newCases}, Deaths +${newDeaths}, Recovered +${newRecover}, Tests +${newTests}, Positivity Rate ${positivity}%`;
	const line3 = `New Highs(${newHighs})`;
	// eslint-disable-next-line prefer-template
	const tweet = line1 + '\n\n' + line2 + '\n\n' + line3 + '\n' + twtHigh + '\n\n#COVID19India';
	// res.end(JSON.stringify(casesByStateLatest));
	res.end(tweet);
};
