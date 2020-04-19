import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import NewCasesChart from './NewCasesChart';
import Statewise from './Statewise';
import AgeDemographics from './charts/AgeDemographics';
import GenderRatio from './charts/GenderRatio';
import ActiveCases from './charts/ActiveCases';

const IndiaMap = dynamic(() => { return import('./geo/IndiaMap'); }, { ssr: false });
// const IndiaMap = dynamic(() => { return import('./geo/IndiaMapD3'); }, { ssr: false });

const Charts = ({ statewiseLatest, newCases }) => {
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
					<IndiaMap statewiseLatest={statewiseLatest} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<Statewise statewiseLatest={statewiseLatest} />
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={24}>
					<div className="section">
						<NewCasesChart cases={newCases} />
					</div>
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
