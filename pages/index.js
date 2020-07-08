/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import StateTable from '../components/StateTable';
import StateStatsTable from '../components/StateStatsTable';
import CovidDataIndia from '../classes/CovidDataIndia';
import TrendInfoCards from '../components/TrendInfoCards';
import MovingAverageCard from '../components/NationalStats/MovingAverageCard';
import CovidDataState from '../classes/CovidDataState';
import Link from '../components/Link';
import StatisticStateTab from '../components/StatisticStateTab';

const IndiaMap = dynamic(() => { return import('../components/geo/IndiaMap'); }, { ssr: false });

function Index({ testingData, indiaData, stateDataLatest }) {
	return (
		<>
			<Head>
				<title>Covid-19 Tracking India</title>
			</Head>
			<StatisticStateTab testingData={testingData} indiaData={indiaData} stateDataLatest={stateDataLatest} />
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={indiaData.cases} days={14} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={indiaData.cases} days={7} />
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">Color scales to measure each states progress</h3>
				</Col>
			</Row>
			<Row>
				<Col flex={24}>
					<p>Scales are based on value of <b>7 day Moving Average</b> of new cases over 14 days.
						Read more about our criteria <a href="/criteria">here</a>.
					</p>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<IndiaMap stateDataMostRecent={stateDataLatest} />
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
						casesByStateLatest={stateDataLatest}
					/>
				</Col>
			</Row>
			<Row>
				<Col flex={24} className="page-section-title">
					<h3 className="title">State Statistics & Numbers</h3>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
					<StateStatsTable
						casesByStateLatest={stateDataLatest}
					/>
				</Col>
			</Row>
			<Row align="middle" justify="center">
				<Col span={24} style={{ textAlign: 'center' }}>
					Data Sources -
					<Link url="https://api.covid19india.org/"> api.covid19india.org </Link> (State Testing Data),
					<Link url="https://www.mohfw.gov.in/"> MOHFW </Link> (State & National Data),
					<Link url="https://www.icmr.gov.in/"> ICMR </Link> (National Testing Numbers)
				</Col>
			</Row>
		</>
	);
}

export async function getStaticProps() {
	const covidDataIndia = new CovidDataIndia();
	const testingData = await covidDataIndia.fetchTests();
	const indiaData = await covidDataIndia.fetchDataIndia();
	const stateDataLatest = await CovidDataState.latest();

	return {
		// will be passed to the page component as props
		props: { indiaData, testingData, stateDataLatest }
	};
}

export default Index;
