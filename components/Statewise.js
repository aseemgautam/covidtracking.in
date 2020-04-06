import { List } from 'antd';
import StateCasesRow from './StateCasesRow';
import StateData from '../data/State';

export default () => {
	return (
		<div>
			<List
				className="state-list"
				header={(
					<>
						{/* <div>+Today</div> */}
						<div>Confirm</div>
						<div>Active</div>
						<div className="red-8">Deaths</div>
						<div className="green">Cured</div>
					</>
				)}
				pagination={{
					pageSize: 9,
				}}
				dataSource={StateData}
				renderItem={state => {
					return (
						<List.Item className="state-case-row">
							<StateCasesRow
								title={state.Name}
								active={state.Confirmed - state.Cured}
								total={state.Confirmed}
								recover={state.Cured}
								fatal={state.Deaths}
							/>
						</List.Item>
					);
				}}
			/>
		</div>
	);
};
