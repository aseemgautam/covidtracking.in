/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import _ from 'lodash';
import StateTableCell from './StateTableCell';

const columns = [
	{ title: 'State',
		dataIndex: 'state',
		width: 100,
		fixed: 'left',
		className: 'state-name',
	},
	{ title: (
		<>
			<div className="plus-today">+TODAY</div>
			<div>TOTAL</div>
		</>
	),
	dataIndex: 'newCases',
	align: 'right',
	width: 70,
	render: (text, record) => {
		return (
			<>
				<div className="plus-today">{text === 0 ? '' : `+${text}`}</div>
				<div className="total">{record.confirmed}</div>
			</>
		);
	}
	},
	{ title: 'Active',
		dataIndex: 'active',
		align: 'right',
		width: 130,
		defaultSortOrder: 'descend',
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.active - b.active;
		},
		render: (text, record) => {
			const delta = record.newActive <= 0 ? record.newActive : record.newActive;
			return {
				children: <StateTableCell showCaret value={text} delta={delta} />
			};
		}
	},
	{ title: 'Deaths',
		dataIndex: 'deaths',
		align: 'right',
		width: 110,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deaths - b.deaths;
		},
		render: (text, record) => {
			return {
				children: <StateTableCell statistic="deaths" value={text} delta={record.newDeaths} />
			};
		}
	},
	{ title: 'Recovered',
		dataIndex: 'recovered',
		align: 'right',
		width: 120,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.recovered - b.recovered;
		},
		render: (text, record) => {
			return (
				<StateTableCell value={text} delta={record.newRecover} isCaretUpRed={false} />
			);
		}
	},
	{
		title: 'Cases P Million',
		dataIndex: 'casesPerMillion',
		align: 'center',
		width: 85,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.casesPerMillion - b.casesPerMillion;
		}
	},
	// {
	// 	title: 'Tests P Million',
	// 	className: 'bold',
	// 	dataIndex: 'testsPerMillion',
	// 	align: 'center',
	// 	width: 85,
	// 	sortDirections: ['descend', 'ascend'],
	// 	sorter: (a, b) => {
	// 		return a.testsPerMillion - b.testsPerMillion;
	// 	}
	// },
	{
		title: 'DEATH RATE',
		dataIndex: 'deathRate',
		align: 'center',
		width: 70,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathRate - b.deathRate;
		}
	},
	{
		title: 'Deaths P Million',
		dataIndex: 'deathsPerMillion',
		align: 'center',
		width: 85,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathsPerMillion - b.deathsPerMillion;
		}
	},
];
const StateStatsTable = ({ casesByStateLatest }) => {
	return (
		<Table
			className="state-table stateStatsTable"
			columns={columns}
			dataSource={casesByStateLatest}
			// dataSource={_.filter(casesByStateLatest, { state: 'Uttar Pradesh' })}
			// dataSource={_.filter(casesByStateLatest, o => {
			// 	return ['Uttar Pradesh', 'Kerala', 'Bihar', 'Odisha', 'Assam'].includes(o.state);
			// })}
			rowKey="state"
			size="small"
			scroll={{ x: 'max-content' }}
			pagination={{ size: 'default', pageSize: 40, hideOnSinglePage: true }}
		/>
	);
};

export default StateStatsTable;
