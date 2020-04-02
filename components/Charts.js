import { Row, Col } from 'antd';
import NewCasesChart from './NewCasesChart';
import DeathVsRecoveredChart from './DeathVsRecoveredChart';
import IndiaChoropleth from './geo/IndiaChoropleth';

const Charts = () => {
	return (
		<>
			<div className="india-map">
				<IndiaChoropleth />
			</div>
			<Row>
				<Col xs={24} md={12}>
					<NewCasesChart />
				</Col>
				<Col xs={24} md={12}>
					<DeathVsRecoveredChart />
				</Col>
			</Row>
		</>
	);
};

export default Charts;
