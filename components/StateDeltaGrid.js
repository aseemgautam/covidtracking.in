import { Card, Tag } from 'antd';
import _ from 'lodash';
import utils from '../classes/Utils';

const gridStyle = {
	height: '50px',
};

const StateDeltaGrid = ({ casesByStateLatest }) => {
	const cards = [];
	let tweet = '';
	let total = 0;
	let className = '';
	const cases = _.orderBy(casesByStateLatest, ['newCases'], ['desc']);
	cases.forEach(state => {
		className = '';
		if (state.newCases > 0 || state.newRecovered > 0) {
			if (state.isHigh) {
				className = 'new-high';
			} else if (state.is14dayHigh) {
				className = 'day-14-high';
			} else if (state.is14dayLow) {
				className = 'day-14-low';
			}
			if (!state.isHigh) {
				tweet += `${state.stateCode} +${state.newCases}, `;
			}
			total += state.newCases;
			cards.push(
				<Card.Grid className={className} key={state.state} style={gridStyle} hoverable={false}>
					<div className="state-name">{state.state}</div> <div className="new-cases">+{state.newCases}</div>
				</Card.Grid>
			);
		}
	});
	console.log(tweet);
	console.log(_.filter(cases, { isHigh: true }).reduce((acc, state) => {
		acc += `${state.stateCode} +${state.newCases}, `;
		return acc;
	}, ''));
	return (
		<>
			<Tag className="delta-grid-tags" color="#ffccc7">New High</Tag>
			<Tag className="delta-grid-tags" color="#ffe7ba">14 Day High</Tag>
			<Tag className="delta-grid-tags" color="#d9f7be">14 Day Low</Tag>
			<br /><br />
			<Card className="card-grid" bordered={false}>
				<Card.Grid key="total" style={gridStyle} hoverable={false}>
					<div className="state-name">
						{/* {utils.getOrdinalNum((new Date()).getDate())}&nbsp;
						{(new Date()).toLocaleString('default', { month: 'long' })} */}
						21st July
					</div> <div className="new-cases total">+{total}</div>
				</Card.Grid>
				{cards}
			</Card>
		</>
	);
};

export default StateDeltaGrid;
