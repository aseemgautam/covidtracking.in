/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Progress, Typography } from 'antd';
import StateTableCell from './StateTableCell';
import Analytics from '../classes/Analytics';
import RateOfGrowthHelp from './RateOfGrowthHelp';
import LineChartSmall from './charts/LineChartSmall';

const { Text } = Typography;
const columns = [
	{ title: 'State',
		dataIndex: 'state',
		width: 105,
		fixed: 'left',
		className: 'state-name'
	},
	{ title: '+ TODAY',
		dataIndex: 'newCases',
		align: 'right',
		width: 80,
		render: text => {
			return (
				<div>{text === 0 ? '' : `+${text}`}</div>
			);
		}
	},
	// {
	// 	title: <RateOfGrowthHelp title="7 DAYS TREND OF COVID+" days={7} />,
	// 	dataIndex: 'rateOfInc7days',
	// 	align: 'center',
	// 	width: 300,
	// 	render: (text, record) => {
	// 		const growthRate = Number.parseFloat(text);
	// 		const progressSettings = Analytics.getProgressColorAndPercent(growthRate);
	// 		return (
	// 			<div className="weekly-rate">
	// 				{record.confirmed > 50
	// 				&& <LineChartSmall fieldX="date" fieldY="active" width={120} data={record.last7DaysActive} />}
	// 				<Progress
	// 					percent={progressSettings.percent}
	// 					showInfo={false}
	// 					status="normal"
	// 					steps={4}
	// 					strokeColor={progressSettings.color}
	// 				/>
	// 				<Text>{`${record.rateOfInc7days}%`}</Text>
	// 			</div>
	// 		);
	// 	}
	// },
	{ title: 'Confirm',
		dataIndex: 'confirmed',
		align: 'center',
		width: 80,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.confirmed - b.confirmed;
		},
	},
	{ title: 'Active',
		dataIndex: 'active',
		align: 'center',
		width: 130,
		defaultSortOrder: 'descend',
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.active - b.active;
		},
		render: (text, record) => {
			const delta = record.newActive; // <= 0 ? record.newActive : record.newActive;
			// const backgroundColor = delta < 0 ? Colors.green2 : '';
			return {
				// props: {
				// 	style: { backgroundColor }
				// },
				children: <StateTableCell showCaret value={text} delta={delta} />
			};
		}
	},
	{ title: 'Deaths',
		dataIndex: 'deaths',
		align: 'center',
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
	{ title: 'Cured',
		dataIndex: 'recovered',
		align: 'center',
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
		title: 'Death %',
		dataIndex: 'deathRate',
		align: 'center',
		width: 110,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathRate - b.deathRate;
		},
		render: (text, record) => {
			let className = '';
			if (record.deathRate > 1.5 * Analytics.deathRate) className = 'red bold';
			if (record.deathRate < 0.5 * Analytics.deathRate) className = 'green bold';
			return (
				<div className={className}>
					{text}
				</div>
			);
		}
	},
	{
		title: 'Cases 1L',
		dataIndex: 'casesPer1L',
		align: 'center',
		width: 110,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.casesPer1L - b.casesPer1L;
		}
	}
];
const StateWise = ({ casesByStateLatest }) => {
	return (
		<Table
			className="state-table"
			columns={columns}
			dataSource={casesByStateLatest}
			rowKey="state"
			size="small"
			scroll={{ x: 'max-content', y: 450 }}
			pagination={{ size: 'default', pageSize: 35, hideOnSinglePage: true }}
		/>
	);
};

export default StateWise;
