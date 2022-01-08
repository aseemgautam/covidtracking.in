import { useState } from 'react';
import { Card, Tag, Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;

const StateDeltaGrid = ({ casesByStateLatest }) => {
	const cards = [];
	const [field, setField] = useState('newCases');
	let tweet = '';
	let newCases = 0; let newRecover = 0; let newDeaths = 0; let newTests = 0;
	let className = ''; let stateName = '';
	const cases = _.orderBy(casesByStateLatest, [field], ['desc']);
	cases.forEach(state => {
		className = '';
		if (state.newCases > 0 || state.newRecover > 0 || state.newDeaths > 0) {
			if (field === 'newCases') {
				if (state.isHigh) {
					className = 'new-high';
				} else if (state.is14dayHigh) {
					className = 'day-14-high';
				} else if (state.is14dayLow) {
					className = 'day-14-low';
				}
			}
			if (!state.isHigh) {
				tweet += `${state.stateCode} +${state.newCases}, `;
			}
			newCases += state.newCases; newRecover += state.newRecover;
			newDeaths += state.newDeaths; newTests += state.newTests;
			stateName = state.state === 'Dadra and Nagar Haveli and Daman and Diu' ? 'Dadra and Nagar Haveli' : state.state;
			if (state.newCases > 0) {
				cards.push(
					<Card.Grid className={className} key={state.state} hoverable={false}>
						<div className="state-name">{stateName}</div> <div className="new-cases">+{state[field]}</div>
					</Card.Grid>
				);
			}
		}
	});
	function handleChange(value) {
		setField(value);
	}
	const tags = (
		<>
			<Tag className="delta-grid-tags" color="#ffccc7">New High</Tag>
			<Tag className="delta-grid-tags" color="#ffe7ba">14 Day High</Tag>
			<Tag className="delta-grid-tags" color="#d9f7be">14 Day Low</Tag>
		</>
	);
	const selectedStyle = { backgroundColor: '#fff1b8', borderBottom: '2px solid #FFD666' };
	return (
		<>
			{ field === 'newCases' && tags }
			<Select
				size="small"
				// dropdownStyle={{ width: '150px;' }}
				dropdownMatchSelectWidth={false}
				className="delta-grid-select"
				defaultValue="newCases"
				onChange={handleChange}
			>
				<Option value="newCases">Cases</Option>
				<Option value="newCasesPMil">Cases P Mil</Option>
				<Option value="newTests">Tests</Option>
				<Option value="newRecover">Recovered</Option>
				<Option value="newDeaths">Deaths</Option>
			</Select>
			<br /><br />
			<Card className="card-grid" bordered={false}>
				<Card.Grid className="title" key="total" style={field === 'newCases' ? selectedStyle : {}} hoverable={false}>
					New Cases
					<div>+{newCases}</div>
				</Card.Grid>
				<Card.Grid className="title" key="recover" style={field === 'newRecover' ? selectedStyle : {}} hoverable={false}>
					Recovered
					<div className="recovered">+{newRecover}</div>
				</Card.Grid>
				<Card.Grid className="title" key="deaths" style={field === 'newDeaths' ? selectedStyle : {}} hoverable={false}>
					Deaths
					<div className="deaths">+{newDeaths}</div>
				</Card.Grid>
				<Card.Grid className="title" key="tests" style={field === 'newTests' ? selectedStyle : {}} hoverable={false}>
					Tests
					<div>+{newTests}</div>
				</Card.Grid>
				{cards}
			</Card>
		</>
	);
};

export default StateDeltaGrid;
