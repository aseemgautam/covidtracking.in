/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import Head from 'next/head';
import Statistics from '../components/Statistics';
import StateTable from '../components/StateTable';
import DailyUpdate from '../components/DailyUpdate';
import Analytics from '../classes/Analytics';

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
			<Statistics />
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">STATE STATISTICS</h3>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<StateTable
						casesByStateLatest={Analytics.casesByStateLatest}
						districts={Analytics.districts}
					/>
				</Col>
			</Row>
		</>
	);
}

export default Index;
