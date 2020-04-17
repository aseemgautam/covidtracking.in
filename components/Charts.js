import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import Statewise from './Statewise';
// import AgeDemographics from './charts/AgeDemographics';
// import IndiaMap from './geo/IndiaMap';

const NewCasesChart = dynamic(import('../components/NewCasesChart'), { ssr: false });

const GenderRatio = dynamic(
	() => { return import('./charts/GenderRatio'); },
	{ loading: () => { return <p>Loading Gender Ratio</p>; }, ssr: false },
);


const ActiveCases = dynamic(
	() => { return import('./charts/ActiveCases'); },
	{ loading: () => { return <p>Loading Active Cases Chart</p>; }, ssr: false }
);

const AgeDemographics = dynamic(import('./charts/AgeDemographics'), { ssr: false });

const Charts = () => {
	return (
		<>
			{/* <div>State Level cases </div> */}
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				{/* <Col xs={24} sm={24} md={12}>
					<div id="india-map" className="india-map">
						<IndiaChoropleth />
					</div>
				</Col> */}
				<Col xs={24} sm={24} md={12}>
					{/* <IndiaMap /> */}
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
