import { Card } from 'antd';
import _ from 'lodash';

const gridStyle = {
	height: '50px',
};

const StateDeltaGrid = ({ casesByStateLatest }) => {
	const cards = [];
	let total = 0;
	const cases = _.orderBy(casesByStateLatest, ['newCases'], ['desc']);
	cases.forEach(state => {
		if (state.newCases > 0 || state.newRecovered > 0) {
			total += state.newCases;
			cards.push(
				<Card.Grid key={state.state} style={gridStyle} hoverable={false}>
					<div className="state-name">{state.state}</div> <div className="new-cases">+{state.newCases}</div>
				</Card.Grid>
			);
		}
	});

	return (
		<Card className="card-grid" bordered={false}>
			<Card.Grid key="total" style={gridStyle} hoverable={false}>
				<div className="state-name">11th July</div> <div className="new-cases total">+{total}</div>
			</Card.Grid>
			{cards}
		</Card>
	);
};

export default StateDeltaGrid;
