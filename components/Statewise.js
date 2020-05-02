/* eslint-disable no-restricted-syntax */
import { Table } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import StateTableCell from './StateTableCell';

const columns = [
	{ title: '', dataIndex: 'state', width: 130, fixed: 'left', ellipsis: true },
	{ title: '',
		dataIndex: 'newCases',
		align: 'left',
		width: 60,
		render: text => {
			return (
				<div className="red"><CaretUpOutlined />{text}</div>
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
				<StateTableCell value={text} delta={delta} />
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
		} }
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
		// <Tabs defaultActiveKey="1" className="state-tabs">
		// 	<TabPane tab="States" key="1">
		// 		<List
		// 			className="state-table"
		// 			header={(
		// 				<>
		// 					<div>Confirm</div>
		// 					<div>Active</div>
		// 					<div className="red-8">Deaths</div>
		// 					<div className="green">Cured</div>
		// 				</>
		// 			)}
		// 			pagination={{
		// 				pageSize: 9,
		// 			}}
		// 			dataSource={statewiseLatest}
		// 			renderItem={state => {
		// 				return (
		// 					<List.Item className="state-case-row">
		// 						<StateCasesRow state={state} />
		// 					</List.Item>
		// 				);
		// 			}}
		// 		/>
		// 	</TabPane>
		// 	<TabPane tab="Districts" key="2">
		// 		<List
		// 			className="district-table"
		// 			header={(
		// 				<>
		// 					<div className="district">City / District</div>
		// 					<div className="state">State</div>
		// 					<div className="confirmed">Cases</div>
		// 				</>
		// 			)}
		// 			pagination={{
		// 				pageSize: 9,
		// 			}}
		// 			dataSource={districts}
		// 			renderItem={item => {
		// 				return (
		// 					<List.Item className="district-case-row">
		// 						<Typography.Text
		// 							className="district"
		// 							ellipsis
		// 						>
		// 							{item.District.toLowerCase()}
		// 						</Typography.Text>
		// 						<Typography.Text className="state" ellipsis>{item.State.toLowerCase()}</Typography.Text>
		// 						<div className="confirmed">{item.Confirmed}</div>
		// 					</List.Item>
		// 				);
		// 			}}
		// 		/>
		// 	</TabPane>
		// </Tabs>
	);
};

export default StateWise;
