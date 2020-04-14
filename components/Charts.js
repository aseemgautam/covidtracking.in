import { Row, Col } from 'antd';
import NewCasesChart from './NewCasesChart';
import IndiaChoropleth from './geo/IndiaChoropleth';
import Statewise from './Statewise';
import AgeDemographics from './charts/AgeDemographics';
import GenderRatio from './charts/GenderRatio';
import ActiveCases from './charts/ActiveCases';

const Charts = () => {
	return (
		<>
			{/* <div>State Level cases </div> */}
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<div id="india-map" className="india-map">
						<IndiaChoropleth />
					</div>
				</Col>
				<Col xs={24} sm={24} md={12}>
					<Statewise />
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={24}>
					<NewCasesChart />
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={12}>
					<div className="section">
						<GenderRatio />
					</div>
				</Col>
				<Col xs={24} md={12}>
					<div className="section">
						<AgeDemographics />
					</div>
				</Col>
			</Row>
			<div>
				<ActiveCases />
			</div>
		</>
	);
};

export default Charts;
