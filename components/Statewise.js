import { Row, Col, List } from 'antd';
import StateCasesRow from './StateCasesRow';
import StateData from '../data/State';

export default () => {
	return (
		<div>
			<List
				pagination={{
					pageSize: 10,
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
