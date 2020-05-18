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
			{/* <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<DailyUpdate date={Analytics.todaysUpdate.date} updates={Analytics.todaysUpdate.updates} />
				</Col>
			</Row> */}
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>NATIONAL STATISTICS</h4>
					<h4>Updated 18th May, 10:42 AM</h4>
				</Col>
			</Row>
			<Statistics />
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>STATE STATISTICS</h4>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<div className="section">
						<StateTable
							casesByStateLatest={Analytics.casesByStateLatest}
							districts={Analytics.districts}
						/>
					</div>
				</Col>
			</Row>
		</>
	);
}

export default Index;
