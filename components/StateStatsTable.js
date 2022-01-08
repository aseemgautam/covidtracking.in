/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import { useRouter } from 'next/router';
import Utils from '../classes/Utils';

let router;

const columns = [
	{ title: 'State',
		dataIndex: 'state',
		width: 100,
		fixed: 'left',
		className: 'state-name',
		sorter: (a, b) => {
			// eslint-disable-next-line prefer-template
			return ('' + a.state).localeCompare(b.state);
		},
		render: (text, record) => {
			const url = `/coronavirus-cases/${record.url}`;
			const handleClick = e => {
				e.preventDefault();
				router.push(url);
			};
			return (
				<a onClick={handleClick}>{text}</a>
			);
		}
	},
	{ title: (
		<>
			{/* <div className="plus-cases">+TODAY</div> */}
			<div>CASES</div>
		</>
	),
	dataIndex: 'newCases',
	align: 'right',
	width: 70,
	render: (text, record) => {
		return (
			<>
				<div className="plus-cases">{text === 0 ? <span>&nbsp;</span> : `+${text}`}</div>
				<div>{record.confirmed.toLocaleString('en-IN')}</div>
			</>
		);
	},
	defaultSortOrder: 'descend',
	sorter: (a, b) => {
		return a.confirmed - b.confirmed;
	}
	},
	{ title: 'Deaths',
		dataIndex: 'deaths',
		align: 'right',
		width: 80,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deaths - b.deaths;
		},
		render: (text, record) => {
			return (
				<>
					<div className="plus-deaths">{record.newDeaths === 0 ? <span>&nbsp;</span> : `+${record.newDeaths}`}</div>
					<div>{text.toLocaleString('en-IN')}</div>
				</>
			);
		}
	},
	{ title: 'Recovered',
		dataIndex: 'recovered',
		align: 'right',
		width: 85,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.recovered - b.recovered;
		},
		render: (text, record) => {
			return (
				<>
					<div className="plus-recovered">{record.newRecover === 0 ? <span>&nbsp;</span> : `+${record.newRecover}`}</div>
					<div>{Utils.getIndianNumberFormat(text)}</div>
				</>
			);
		}
	},
	{ title: 'Active',
		dataIndex: 'active',
		align: 'right',
		width: 80,
		sorter: (a, b) => {
			return a.active - b.active;
		},
		render: (text, record) => {
			let active; let className;
			if (record.newActive === 0) {
				active = <span>&nbsp;</span>;
			} else if (record.newActive > 0) {
				className = 'plus-active';
				active = `+${record.newActive}`;
			} else {
				className = 'minus-active';
				active = record.newActive;
			}
			return (
				<>
					<div className={className}>{active}</div>
					<div>{text.toLocaleString('en-IN')}</div>
				</>
			);
		}
	},
	{
		title: 'Death Rate',
		dataIndex: 'deathRate',
		align: 'right',
		width: 70,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathRate - b.deathRate;
		},
		render: text => {
			return (
				<>
					<div>{text}%</div>
				</>
			);
		}
	},
	{ title: (
		<>
			<div>TESTS</div>
		</>
	),
	dataIndex: 'tests',
	align: 'right',
	width: 80,
	render: (text, record) => {
		return (
			<>
				<div style={{ color: '#0050b3' }}>{record.newTests === 0 ? <span>&nbsp;</span> : `+${record.newTests}`}</div>
				<div>{Utils.getIndianNumberFormat(text)}</div>
			</>
		);
	},
	sorter: (a, b) => {
		return a.tests - b.tests;
	}
	},
	{
		title: 'POSITIVITY RATE',
		dataIndex: 'positivity',
		align: 'right',
		width: 70,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.positivity - b.positivity;
		},
		render: text => {
			return (
				<>
					<div>{text}%</div>
				</>
			);
		}
	},
	{
		title: 'Per Million',
		children: [
			{
				title: 'Cases',
				dataIndex: 'casesPerMillion',
				align: 'center',
				width: 70,
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => {
					return a.casesPerMillion - b.casesPerMillion;
				}
			},
			{
				title: 'Tests',
				dataIndex: 'testsPerMillion',
				align: 'center',
				width: 70,
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => {
					return a.testsPerMillion - b.testsPerMillion;
				}
			},
			{
				title: 'Deaths',
				dataIndex: 'deathsPerMillion',
				align: 'center',
				width: 70,
				sortDirections: ['descend', 'ascend'],
				sorter: (a, b) => {
					return a.deathsPerMillion - b.deathsPerMillion;
				}
			},
		]
	},
];
const StateStatsTable = ({ casesByStateLatest }) => {
	router = useRouter();
	return (
		<Table
			className="state-table state-stats-table"
			columns={columns}
			dataSource={casesByStateLatest}
			rowKey="state"
			size="small"
			scroll={{ x: 'max-content' }}
			pagination={{ size: 'default', pageSize: 40, hideOnSinglePage: true }}
		/>
	);
};

export default StateStatsTable;
