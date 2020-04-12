import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import NewCasesChart from './NewCasesChart';
import DeathVsRecoveredChart from './DeathVsRecoveredChart';
import IndiaChoropleth from './geo/IndiaChoropleth';
import Statewise from './Statewise';
import AgeDemographics from './charts/AgeDemographics';
import GenderRatio from './charts/GenderRatio';

// const GenderRatioNoSSR = dynamic(
// 	() => { return import('./charts/GenderRatio'); },
// 	{ ssr: false }
// );
// const AgeDemographicsNoSSR = dynamic(
// 	() => { return import('./charts/AgeDemographics'); },
// 	{ ssr: false }
// );

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
				<Col xs={24} md={12}>
					<NewCasesChart />
				</Col>
				<Col xs={24} md={12}>
					<DeathVsRecoveredChart />
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
		</>
	);
};

export default Charts;
