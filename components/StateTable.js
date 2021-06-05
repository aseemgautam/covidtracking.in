/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import _ from 'lodash';
import MovingAverageProgress from './MovingAverageProgress';
import LineChartSmall from './charts/LineChartSmall';
import Colors from '../classes/Colors';
import TrendIndicator from './TrendIndicator';
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
			return {
				props: {
					style: {
						backgroundColor: Colors.getTrendColor(record.movingAvg14daysRate, record.newCases14days),
						color: '#fff'
					}
				},
				children: <a style={{ color: '#fff' }} onClick={handleClick}>{text}</a>,
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
];
const StateTable = ({ casesByStateLatest }) => {
	router = useRouter();
	return (
		<Table
			className="state-table"
			columns={columns}
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
