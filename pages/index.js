/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NationalStats from '../components/NationalStats';
import StateTable from '../components/StateTable';
import CovidDataStateWise from '../classes/CovidDataStateWise';
import CovidDataIndia from '../classes/CovidDataIndia';
import TrendInfoCards from '../components/TrendInfoCards';
import MovingAverageCard from '../components/NationalStats/MovingAverageCard';

const IndiaMap = dynamic(() => { return import('../components/geo/IndiaMap'); }, { ssr: false });

function Index() {
	return (
		<>
			<Head>
				<title>Covid-19 Tracking India</title>
			</Head>
			<Row>
				<Col span={24}>
					<p>Tracking spread of coronavirus in India using scientific & mathematical models recommended by
						White House & CDC (Centers for Disease Control and Prevention) USA.
					</p>
				</Col>
				<Col style={{ paddingTop: 0 }} span={24} className="page-section-title">
					<h3 className="title">National Statistics</h3>
					<h5>Updated 16th June, 07:45 PM</h5>
				</Col>
			</Row>
			<NationalStats />
			<Row>
				<Col span={24} className="page-section-title">
					<h3 className="title">Trends of New COVID+ Cases (Daily, Average)</h3>
				</Col>
				<Col span={24}>
					<p> CDC recommends
						Downward trajectory of
						new COVID-19 cases (7 day rolling average) over a 14-day period as one of the gating criteria to open
						up various states. <a href="/criteria">Criteria Details.</a>
					</p>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={CovidDataIndia.cases} days={14} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={CovidDataIndia.cases} days={7} />
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">Color scales to measure each states progress</h3>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<IndiaMap />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<TrendInfoCards colSpan={12} />
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">Statewise Trends of New COVID+ Cases</h3>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<StateTable
						casesByStateLatest={CovidDataStateWise.latest}
					/>
				</Col>
			</Row>
		</>
	);
}

export default Index;
