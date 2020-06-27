/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import _ from 'lodash';
import MovingAverageProgress from './MovingAverageProgress';
import LineChartSmall from './charts/LineChartSmall';
import Colors from '../classes/Colors';

const columns = [
	{ title: 'State',
		dataIndex: 'state',
		width: 100,
		fixed: 'left',
		className: 'state-name',
		render: (text, record) => {
			return {
				props: {
					style: {
						backgroundColor: Colors.getTrendColor(record.movingAvg14daysRate, record.newCases14days),
						color: '#fff'
					}
				},
				children: text,
			};
		}
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
	{ title: (
		<>
			<div>% POSITV</div>
			<div>TESTS</div>
		</>
	),
	dataIndex: 'tests',
	align: 'right',
	width: 85,
	render: (text, record) => {
		return (
			<>
				<div className="total">{record.positivePercent}</div>
				<div className="total">{text}</div>
			</>
		);
	}
	},
	{
		title: (
			<>
				<div>Growth of new covid cases (14 DAYS)</div>
				<div className="sub-heading">7 Day moving average over 14 days (Chart)</div>
			</>
		),
		dataIndex: 'movingAvg14days',
		align: 'center',
		width: 295,
		render: (text, record) => {
			return (
				<div className="weekly-rate">
					<div>
						<LineChartSmall
							fieldX="date"
							height={50}
							fieldY="movingAverage"
							autoSize={false}
							width={160}
							data={record.movingAvg14daysData}
						/>
					</div>
					<MovingAverageProgress
						rateOfInc={record.movingAvg14daysRate}
						newCases={record.newCases14days}
					/>
					<div className="progress-rate">{record.movingAvg14daysRate}%</div>
				</div>
			);
		}
	},
	{
		title: (
			<>
				<div>Growth of new covid cases (7 DAYS)</div>
				<div className="sub-heading">7 day moving average over 7 days (Chart)</div>
			</>
		),
		dataIndex: 'movingAvg7days',
		align: 'center',
		width: 295,
		render: (text, record) => {
			return (
				<div className="weekly-rate">
					<LineChartSmall
						fieldX="date"
						height={50}
						fieldY="movingAverage"
						autoSize={false}
						width={160}
						data={record.movingAvg7daysData}
					/>
					<MovingAverageProgress
						rateOfInc={record.movingAvg7daysRate}
						newCases={record.newCases14days}
					/>
					<div className="progress-rate">{record.movingAvg7daysRate}%</div>
				</div>
			);
		}
	},
	// { title: 'Confirm',
	// 	dataIndex: 'confirmed',
	// 	align: 'center',
	// 	width: 80,
	// 	sortDirections: ['descend', 'ascend'],
	// 	sorter: (a, b) => {
	// 		return a.confirmed - b.confirmed;
	// 	},
	// },
	// { title: 'Active',
	// 	dataIndex: 'active',
	// 	align: 'center',
	// 	width: 130,
	// 	defaultSortOrder: 'descend',
	// 	sortDirections: ['descend', 'ascend'],
	// 	sorter: (a, b) => {
	// 		return a.active - b.active;
	// 	},
	// 	render: (text, record) => {
	// 		const delta = record.newActive; // <= 0 ? record.newActive : record.newActive;
	// 		// const backgroundColor = delta < 0 ? Colors.green2 : '';
	// 		return {
	// 			// props: {
	// 			// 	style: { backgroundColor }
	// 			// },
	// 			children: <StateTableCell showCaret value={text} delta={delta} />
	// 		};
	// 	}
	// },
	// { title: 'Deaths',
	// 	dataIndex: 'deaths',
	// 	align: 'center',
	// 	width: 110,
	// 	sortDirections: ['descend', 'ascend'],
	// 	sorter: (a, b) => {
	// 		return a.deaths - b.deaths;
	// 	},
	// 	render: (text, record) => {
	// 		return {
	// 			children: <StateTableCell statistic="deaths" value={text} delta={record.newDeaths} />
	// 		};
	// 	}
	// },
	// { title: 'Cured',
	// 	dataIndex: 'recovered',
	// 	align: 'center',
	// 	width: 120,
	// 	sortDirections: ['descend', 'ascend'],
	// 	sorter: (a, b) => {
	// 		return a.recovered - b.recovered;
	// 	},
	// 	render: (text, record) => {
	// 		return (
	// 			<StateTableCell value={text} delta={record.newRecover} isCaretUpRed={false} />
	// 		);
	// 	}
	// },
	{
		title: 'Cases Per Million',
		className: 'bold',
		dataIndex: 'casesPerMillion',
		align: 'center',
		width: 90,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.casesPerMillion - b.casesPerMillion;
		}
	},
	{
		title: 'Tests Per Million',
		className: 'bold',
		dataIndex: 'testsPerMillion',
		align: 'center',
		width: 90,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.testsPerMillion - b.testsPerMillion;
		}
	},
	{
		title: 'DEATH RATE',
		className: 'bold',
		dataIndex: 'deathRate',
		align: 'center',
		width: 70,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathRate - b.deathRate;
		}
	}
];
const StateTable = ({ casesByStateLatest }) => {
	return (
		<Table
			className="state-table"
			columns={columns}
			dataSource={casesByStateLatest}
			// dataSource={_.filter(casesByStateLatest, { state: 'Karnataka' })}
			// dataSource={_.filter(casesByStateLatest, o => {
			// 	return o.movingAvg7daysRate <= 0 && o.movingAvg14daysRate <= 0;
			// })}
			rowKey="state"
			size="small"
			scroll={{ x: 'max-content' }}
			pagination={{ size: 'default', pageSize: 40, hideOnSinglePage: true }}
		/>
	);
};

export default StateTable;
