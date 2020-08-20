/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Tag } from 'antd';
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
		width: 100,
		align: 'right',
		sorter: (a, b) => {
			return a.newTests - b.newTests;
		},
		render: (text, record) => {
			let color = '';
			if (record.testingTrend >= 10) {
				color = 'green';
			}
			if (record.testingTrend <= 0) {
				color = 'red';
			}
			const prefix = record.testingTrend > 0 ? '+' : '';
			const testElement = (
				<div className="cell-with-trend-indicator">
					<Tag color={color}>{prefix}{record.testingTrend}%</Tag>
					<div>{text}</div>
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
		}
	},
	{ title: 'Deaths',
		dataIndex: 'newDeaths',
		width: 60,
		align: 'right',
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deaths - b.deaths;
		}
	},
	{ title: 'Recovered',
		dataIndex: 'newRecover',
		align: 'right',
		width: 70,
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
			scroll={{ y: 400, x: 600 }}
			pagination={{ size: 'default', pageSize: 40, hideOnSinglePage: true }}
		/>
	);
};

export default DailyReportTable;
