/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Tag } from 'antd';
import _ from 'lodash';
import MovingAverageProgress from './MovingAverageProgress';
import LineChartSmall from './charts/LineChartSmall';
import Colors from '../classes/Colors';
import MonthlyNewCasesChart from './chartsv2/MonthlyNewCasesChart';

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
				<div>Growth of covid+ cases (14 DAYS)</div>
				<div className="sub-heading">7 Day moving average (14 day period)</div>
			</>
		),
		dataIndex: 'movingAvg14days',
		align: 'center',
		width: 290,
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
				<div>Growth of covid+ cases (7 DAYS)</div>
				<div className="sub-heading">7 day moving average</div>
			</>
		),
		dataIndex: 'movingAvg7daysRate',
		align: 'center',
		width: 290,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.movingAvg7daysRate - b.movingAvg7daysRate;
		},
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
	{
		title: (
			<>
				<div>New cases in last 28 days</div>
				<div className="sub-heading newCases28DaysSubHeader">
					<span><Tag color={Colors.monthlyNewCasesChart[0]}>0-7 (Latest)</Tag></span>
					<span><Tag color={Colors.monthlyNewCasesChart[1]}>8-14</Tag></span>
					<span><Tag color={Colors.monthlyNewCasesChart[2]}>15-21</Tag></span>
					<span><Tag color={Colors.monthlyNewCasesChart[3]}>22-28</Tag></span>
				</div>
			</>
		),
		dataIndex: 'newCases14days',
		align: 'center',
		width: 280,
		render: (text, record) => {
			const data = [record.newCases1to7days, record.newCases8to14days,
				record.newCases15to21Days, record.newCases22to28Days];
			return (
				<MonthlyNewCasesChart data={data} />
			);
		}
	}
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
