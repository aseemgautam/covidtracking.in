/* eslint-disable no-restricted-syntax */
import Head from 'next/head';
import { Row, Col } from 'antd';
import Statistics from '../components/Statistics';
import StateTable from '../components/StateTable';
import DailyUpdate from '../components/DailyUpdate';
import Analytics from '../classes/Analytics';

function Index() {
	return (
		<>
			<Head>
				<title>Covid-19 Insights & Analytics - India</title>
			</Head>
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>TODAY&apos;s INSIGHTS </h4>
					<div className="last-updated">Updated Daily at 9 AM</div>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<div className="section">
						<DailyUpdate updates={Analytics.todaysUpdate} />
					</div>
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>NATIONAL STATISTICS</h4>
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
