/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NationalStats from '../components/NationalStats';
import StateTable from '../components/StateTable';
import Analytics from '../classes/Analytics';
import TrendInfoCards from '../components/TrendInfoCards';

const IndiaMap = dynamic(() => { return import('../components/geo/IndiaMap'); }, { ssr: false });

function Index() {
	return (
		<>
			<Head>
				<title>COVID-19 Tracker & Dashboard - India</title>
			</Head>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">NATIONAL STATISTICS</h3>
					<h5>Updated 21st May, 10:26 AM</h5>
				</Col>
			</Row>
			<NationalStats />
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<IndiaMap stateWise statewiseLatest={Analytics.casesByStateLatest} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<TrendInfoCards />
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">STATE STATISTICS</h3>
				</Col>
			</Row>
			{/* <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<StateTable
						casesByStateLatest={Analytics.casesByStateLatest}
						districts={Analytics.districts}
					/>
				</Col>
			</Row> */}
		</>
	);
}

export default Index;
