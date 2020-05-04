/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Table, Progress, Typography } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import StateTableCell from './StateTableCell';
import Colors from '../classes/Colors';

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
		title: 'Weekly Rate',
		dataIndex: 'rateOfInc7days',
		align: 'center',
		width: 160,
		render: (text, record) => {
			const growthRate = Number.parseFloat(text);
			let color = '#f3f3f3';
			if (growthRate) {
				if (growthRate > 100) color = Colors.red6;
				else if (growthRate > 75) color = Colors.orange6;
				else if (growthRate > 50) color = Colors.yellow6;
				else if (growthRate > 25) color = Colors.yellow6;
				else if (growthRate > 0) {
					color = Colors.green6;
					text = 25;
				} else if (growthRate < 0) { color = Colors.green7; text = 100; }
			}
			return (
				<div className="weekly-rate">
					<Progress percent={text} showInfo={false} status="normal" steps={4} strokeColor={color} />
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
			const delta = record.newActive <= 0 ? record.newActive : record.newActive;
			return (
				<StateTableCell showCaret value={text} delta={delta} />
			);
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
			return (
				<StateTableCell value={text} delta={record.newDeaths} />
			);
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
		title: 'Cases /1L',
		dataIndex: 'casesPer1L',
		align: 'right',
		width: 110,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.casesPer1L - b.casesPer1L;
		}
	},
	{
		title: 'Death Rate',
		dataIndex: 'deathRate',
		align: 'right',
		width: 110,
		sortDirections: ['descend', 'ascend'],
		sorter: (a, b) => {
			return a.deathRate - b.deathRate;
		}
	}
];
const StateWise = ({ casesByStateLatest, districts }) => {
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
