import { Row, Col } from 'antd';
import NewCasesChart from './NewCasesChart';
import DeathVsRecoveredChart from './DeathVsRecoveredChart';
import IndiaChoropleth from './geo/IndiaChoropleth';
import Statewise from './Statewise';

const Charts = () => {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={24} md={12}>
					<div id="india-map" className="india-map">
						<IndiaChoropleth />
					</div>
				</Col>
				<Col xs={24} sm={24} md={12}>
					<Statewise />
				</Col>
			</Row>
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
