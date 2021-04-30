/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Tag } from 'antd';
import numeral from 'numeral';
import _ from 'lodash';

const columns = [
	{ title: 'State',
		dataIndex: 'state',
		width: 105,
		fixed: true,
		render: (text, record) => {
			let tag = '';
			if (record.isHigh) {
				tag = <Tag color="red">H</Tag>;
			} else if (record.is14dayHigh) {
				tag = <Tag color="orange">H</Tag>;
			} else if (record.is14dayLow) {
				tag = <Tag color="green">L</Tag>;
			}
			return (
				<div className="state-name"><div className="ellipses">{text}</div> {tag}</div>
			);
		},
		sorter: (a, b) => {
			// eslint-disable-next-line prefer-template
			return ('' + a.state).localeCompare(b.state);
		}
	},
	{ title: 'Cases',
		dataIndex: 'newCases',
		width: 100,
		align: 'right',
		sorter: (a, b) => {
			return a.newCases - b.newCases;
		},
		defaultSortOrder: 'descend',
		render: (text, record) => {
			let color = '';
			if (record.newCasesTrend >= 10) {
				color = 'red';
			}
			if (record.newCasesTrend <= 0) {
				color = 'green';
			}
			const prefix = record.newCasesTrend > 0 ? '+' : '';
			return (
				<div className="cell-with-trend-indicator">
					<Tag color={color}>{prefix}{record.newCasesTrend}%</Tag>
					<div>{text}</div>
				</div>
			);
		}
	},
	{ title: 'Tests',
		dataIndex: 'newTests',
		width: 110,
		align: 'right',
		sorter: (a, b) => {
			return a.newTests - b.newTests;
		},
		render: (text, record) => {
			let color = '';
			if (record.dailyTestingTrend >= 5) {
				color = 'green';
			}
			if (record.dailyTestingTrend <= 0) {
				color = 'red';
			}
			const prefix = record.dailyTestingTrend > 0 ? '+' : '';
			const testElement = (
				<div className="cell-with-trend-indicator">
					<Tag color={color}>{prefix}{record.dailyTestingTrend}%</Tag>
					<div>{numeral(record.newTests).format('0.0a')}</div>
				</div>
			);
			return (
				<>
					{record.newTests > 0 && testElement}
				</>
			);
		}
	},
	{ title: '+ve %',
		dataIndex: 'dailyPositivity',
		width: 80,
		align: 'right',
		sorter: (a, b) => {
			return a.dailyPositivity - b.dailyPositivity;
		},
		render: text => {
			const className = parseInt(text, 10) > 10 ? 'red' : null;
			return (
				<div className={className}>{text}</div>
			);
		}
	},
	{ title: 'Deaths',
		dataIndex: 'newDeaths',
		width: 50,
		align: 'right',
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deaths - b.deaths;
		}
	},
	{ title: 'WCT',
		dataIndex: 'movingAvg7daysRate',
		align: 'right',
		width: 80,
		sortDirections: ['descend', 'ascend'],
		className: 'weekly-trend',
		render: (text, record) => {
			if (record.movingAvg7daysRate > 0) {
				return (
					<div className="weekly-trend-negative">
						+{record.movingAvg7daysRate}%
					</div>
				);
			}
			return (
				<div className="weekly-trend-positive">
					{-Math.abs(record.movingAvg7daysRate)}%
				</div>
			);
		},
		sorter: (a, b) => {
			return a.movingAvg7daysRate - b.movingAvg7daysRate;
		}
	},
	{ title: 'WTT',
		dataIndex: 'testingTrend',
		align: 'right',
		width: 80,
		sortDirections: ['descend', 'ascend'],
		className: 'weekly-trend',
		render: (text, record) => {
			const trendValue = parseFloat(record.testingTrend);
			if (Number.isNaN(trendValue)) {
				return (
					<div>&nbsp;</div>
				);
			}
			if (trendValue > 0) {
				return (
					<div className={record.testingTrend > 5 ? 'weekly-trend-positive' : 'weekly-trend-none'}>
						+{Math.round(record.testingTrend, 2)}%
					</div>
				);
			}
			return (
				<div className="weekly-trend-negative">
					{Math.round(record.testingTrend, 2)}%
				</div>
			);
		},
		sorter: (a, b) => {
			return a.testingTrend - b.testingTrend;
		}
	},
	{ title: 'Recovered',
		dataIndex: 'newRecover',
		align: 'right',
		width: 100,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.newRecover - b.newRecover;
		}
	}
];
const DailyReportTable = ({ casesByStateLatest }) => {
	return (
		<Table
			className="daily-report-table"
			columns={columns}
			bordered
			dataSource={_.filter(casesByStateLatest, row => {
				return row.newCases > 0 || row.newRecover > 0;
			})}
			rowKey="state"
			size="small"
			scroll={{ x: 500 }}
			pagination={{ size: 'default', pageSize: 17, hideOnSinglePage: true }}
		/>
	);
};

export default DailyReportTable;
