/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Progress, Typography } from 'antd';
import StateTableCell from './StateTableCell';
import Colors from '../classes/Colors';
import Analytics from '../classes/Analytics';
import RateOfGrowthHelp from './RateOfGrowthHelp';

const { Text } = Typography;
const columns = [
	{ title: '', dataIndex: 'state', width: 130, fixed: 'left', ellipsis: true },
	{ title: 'New',
		dataIndex: 'newCases',
		align: 'left',
		width: 60,
		render: text => {
			return (
				<div>{text === 0 ? '' : `+${text}`}</div>
			);
		}
	},
	{
		title: <RateOfGrowthHelp days={7} />,
		dataIndex: 'rateOfInc7days',
		align: 'center',
		width: 170,
		render: (text, record) => {
			const growthRate = Number.parseFloat(text);
			const progressSettings = Analytics.getProgressColorAndPercent(growthRate);
			return (
				<div className="weekly-rate">
					<Progress
						percent={progressSettings.percent}
						showInfo={false}
						status="normal"
						steps={4}
						strokeColor={progressSettings.color}
					/>
					<Text type="secondary">{`${record.rateOfInc7days}%`}</Text>
				</div>
			);
		}
	},
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
			const backgroundColor = delta < 0 ? Colors.green2 : '';
			return {
				props: {
					style: { backgroundColor }
				},
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
		width: 100,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.casesPer1L - b.casesPer1L;
		}
	}
];
const StateWise = ({ casesByStateLatest }) => {
	// const isMobile = window.innerWidth < 576;
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