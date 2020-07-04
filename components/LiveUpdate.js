import { Card } from 'antd';

const gridStyle = {
	height: '60px',
	maxWidth: '180px'
};

const LiveUpdate = ({ casesByStateLatest }) => {
	const cards = [];
	let total = 0;
	casesByStateLatest.forEach(state => {
		if (state.newCases > 0) {
			total += state.newCases;
			cards.push(
				<Card.Grid key={state.state} style={gridStyle}>
					<div className="state-name">{state.state}</div> <div className="new-cases">+{state.newCases}</div>
				</Card.Grid>
			);
		}
	});
	return (
		<Card className="live-update-cards">
			<Card.Grid key="total" style={gridStyle}>
				<div className="today">TODAY <br />(04 July)</div> <div className="new-cases total">+{total}</div>
			</Card.Grid>
			{cards}
		</Card>
	);
};

export default LiveUpdate;
