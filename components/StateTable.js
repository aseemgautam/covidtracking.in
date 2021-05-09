/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import numeral from 'numeral';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import _ from 'lodash';
import MovingAverageProgress from './MovingAverageProgress';
import LineChartSmall from './charts/LineChartSmall';
import Colors from '../classes/Colors';
import TrendIndicator from './TrendIndicator';
import Utils from '../classes/Utils';

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
			return {
				props: {
					style: {
						backgroundColor: Colors.getTrendColor(record.movingAvg14daysRate, record.newCases14days),
						color: '#fff'
					}
				},
				children: <a style={{ color: '#fff' }} href={`/coronavirus-cases/${record.url}`}>{text}</a>,
			};
		}
	},
	{ title: (
		<>
			<div>% +VE</div>
			<div>TESTS</div>
		</>
	),
	dataIndex: 'tests',
	align: 'right',
	width: 70,
	render: (text, record) => {
		return (
			<>
				<div className="total">{record.positivity}%</div>
				{/* <div className="total">{numeral(text).format('0.0a')}</div> */}
				<div className="total">{Utils.getIndianNumberFormat(text)}</div>
			</>
		);
	},
	sorter: (a, b) => {
		return a.tests - b.tests;
	}
	},
	{ title: 'Testing Trend',
		dataIndex: 'testingTrend',
		align: 'center',
		width: 100,
		sorter: (a, b) => {
			return a.testingTrend - b.testingTrend;
		},
		render: (text, record) => {
			return (
				<TrendIndicator value={numeral(record.testingTrend).format('0')} isPercent />
			);
		}
	},
	{ title: 'Positivity Trend',
		dataIndex: 'positivityTrend',
		align: 'center',
		width: 100,
		sorter: (a, b) => {
			return a.positivityTrend - b.positivityTrend;
		},
		render: (text, record) => {
			return (
				<TrendIndicator value={numeral(record.positivityTrend).format('0.0')} isPercent reverse />
			);
		}
	},
	{
		title: (
			<>
				<div> COVID+ GROWTH (14 DAYS)</div>
			</>
		),
		dataIndex: 'movingAvg14days',
		align: 'center',
		width: 220,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.movingAvg14daysRate - b.movingAvg14daysRate;
		},
		render: (text, record) => {
			return (
				<div className="weekly-rate">
					<div>
						<LineChartSmall
							fieldX="date"
							height={35}
							fieldY="movingAverage"
							autoSize={false}
							width={120}
							data={record.movingAvg14daysData}
						/>
					</div>
					<div className="growth-rate">
						<MovingAverageProgress
							rateOfInc={record.movingAvg14daysRate}
							newCases={record.newCases14days}
						/>
						<div className="progress-rate">{record.movingAvg14daysRate}%</div>
					</div>
				</div>
			);
		}
	},
	{
		title: (
			<>
				<div> COVID+ GROWTH (7 DAYS)</div>
			</>
		),
		dataIndex: 'movingAvg7daysRate',
		align: 'center',
		width: 220,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.movingAvg7daysRate - b.movingAvg7daysRate;
		},
		render: (text, record) => {
			return (
				<div className="weekly-rate">
					<LineChartSmall
						fieldX="date"
						height={35}
						fieldY="movingAverage"
						autoSize={false}
						width={120}
						data={record.movingAvg7daysData}
					/>
					<div className="growth-rate">
						<MovingAverageProgress
							rateOfInc={record.movingAvg7daysRate}
							newCases={record.newCases14days}
						/>
						<div className="progress-rate">{record.movingAvg7daysRate}%</div>
					</div>
				</div>
			);
		}
	},
	// {
	// 	title: (
	// 		<>
	// 			<div>New cases in last 28 days</div>
	// 			<div className="sub-heading newCases28DaysSubHeader">
	// 				<span><Tag color={Colors.monthlyNewCasesChart[0]}>0-7 (Latest)</Tag></span>
	// 				<span><Tag color={Colors.monthlyNewCasesChart[1]}>8-14</Tag></span>
	// 				<span><Tag color={Colors.monthlyNewCasesChart[2]}>15-21</Tag></span>
	// 				<span><Tag color={Colors.monthlyNewCasesChart[3]}>22-28</Tag></span>
	// 			</div>
	// 		</>
	// 	),
	// 	dataIndex: 'newCases14days',
	// 	align: 'center',
	// 	width: 280,
	// 	render: (text, record) => {
	// 		const data = [record.newCases1to7days, record.newCases8to14days,
	// 			record.newCases15to21Days, record.newCases22to28Days];
	// 		return (
	// 			<MonthlyNewCasesChart data={data} />
	// 		);
	// 	}
	// }
];
const StateTable = ({ casesByStateLatest }) => {
	return (
		<Table
			className="state-table"
			columns={columns}
			// dataSource={casesByStateLatest}
			// dataSource={_.filter(casesByStateLatest, { state: 'Delhi' })}
			// dataSource={_.filter(casesByStateLatest, o => {
			// 	return ['Karnataka', 'Delhi'].includes(o.state);
			// 	// return ['Kerala', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra'].includes(o.state);
			// })}
			dataSource={_.filter(casesByStateLatest, o => {
				return o.confirmed > 250;
			})}
			rowKey="state"
			size="small"
			scroll={{ x: 'max-content' }}
			pagination={{ size: 'default', pageSize: 40, hideOnSinglePage: true }}
		/>
	);
};

export default StateTable;
