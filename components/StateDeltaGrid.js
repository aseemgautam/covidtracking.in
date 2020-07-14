import { Card } from 'antd';
import _ from 'lodash';

const gridStyle = {
	height: '50px',
};

const StateDeltaGrid = ({ casesByStateLatest }) => {
	let tweet = '';
	const cards = [];
	let total = 0;
	const cases = _.orderBy(casesByStateLatest, ['newCases'], ['desc']);
	cases.forEach(state => {
		if (state.newCases > 0 || state.newRecovered > 0) {
			if (!state.isHigh) {
				tweet += `${state.stateCode} +${state.newCases} `;
			}
			total += state.newCases;
			cards.push(
				<Card.Grid key={state.state} style={gridStyle} hoverable={false}>
					<div className="state-name">{state.state}</div> <div className="new-cases">+{state.newCases}</div>
				</Card.Grid>
			);
		}
	});
	// console.log(_.filter(cases, { isHigh: true }).reduce((acc, state) => {
	// 	acc += `${state.stateCode} +${state.newCases} `;
	// 	return acc;
	// }, ''));
	// console.log(tweet);
	return (
		<Card className="card-grid" bordered={false}>
			<Card.Grid key="total" style={gridStyle} hoverable={false}>
				<div className="state-name">14th July</div> <div className="new-cases total">+{total}</div>
			</Card.Grid>
			{cards}
		</Card>
	);
};

export default StateDeltaGrid;
