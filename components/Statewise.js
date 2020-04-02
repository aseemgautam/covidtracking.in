import { Row, Col, List } from 'antd';
import StateCasesRow from './StateCasesRow';
import StateData from '../data/State';

export default () => {
	return (
		<div>
			<Row className="section-heading" justify="space-between">
				<Col flex={2}>
					<h3>State wise (latest)</h3>
				</Col>
				<Col flex>
					<div className="state-panel-stats">
						<div>Active</div>
						<div>Total</div>
						<div>Recov</div>
						<div>Deaths</div>
					</div>
				</Col>
			</Row>
			<List
				// header={<div>Header</div>}
				// footer={<div>Footer</div>}
				dataSource={StateData}
				renderItem={state => {
					return (
						<List.Item>
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
