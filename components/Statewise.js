/* eslint-disable no-restricted-syntax */
import { Table, List, Tabs, Typography } from 'antd';

const { TabPane } = Tabs;
const columns = [
	{ title: '', dataIndex: 'state' },
	{ title: '', dataIndex: 'newCases', align: 'center' },
	{ title: 'Confirm', dataIndex: 'confirmed', align: 'center' },
	{ title: 'Active', dataIndex: 'active', align: 'center' },
	{ title: 'Deaths', dataIndex: 'deaths', align: 'center' },
	{ title: 'Cured', dataIndex: 'recovered', align: 'center' }
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
			// scroll={{ x: 450 }}
			pagination={{ size: 'default', pageSize: 10 }}
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
