import { Collapse, Row, Col, List } from 'antd';
import StatePanelHeader from './StatePanelHeader';
import StateData from '../data/State';
import DistrictData from '../data/District';

const { Panel } = Collapse;

export default () => {
	const statePanels = [];
	// eslint-disable-next-line no-restricted-syntax
	for (const state of StateData) {
		const districts = DistrictData.filter(district => {
			return district.State.toLowerCase() === state.Name.toLowerCase();
		}).map(district => {
			return (
				<List.Item key={district.Name}>
					<div>{district.Name}</div>
					<div>{district.Cases}</div>
				</List.Item>
			);
		});
		const districtList = (
			<List>
				{districts}
			</List>
		);
		if (state.No < 90) {
			statePanels.push(
				<Panel
					key={state.No}
					header={
						(
							<StatePanelHeader
								title={state.Name}
								active={state.Confirmed - state.Discharged}
								total={state.Confirmed}
								recover={state.Discharged}
								fatal={state.Fatal}
							/>
						)
					}
				>
					<div>{districtList}</div>
				</Panel>
			);
		}
	}
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
			<Collapse className="state-collapse" accordion>
				{statePanels}
			</Collapse>
		</div>
	);
};
