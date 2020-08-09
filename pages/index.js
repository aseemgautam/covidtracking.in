/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import Head from 'next/head';
import CovidDataIndia from '../classes/CovidDataIndia';
import MovingAverageCard from '../components/NationalStats/MovingAverageCard';
import CovidDataState from '../classes/CovidDataState';
import HomePageTabsFirst from '../components/HomePageTabsFirst';
import HomePageTabsSecond from '../components/HomePageTabsSecond';
import Utils from '../classes/Utils';
import { PeakChart } from '../components/chartsv2/Peak';

function Index({ testingData, indiaData, stateDataLatest, buildTime }) {
	return (
		<>
			<Head>
				<title>Covid-19 Tracking India</title>
			</Head>
			<HomePageTabsFirst
				testingData={testingData}
				indiaData={indiaData}
				stateDataLatest={stateDataLatest}
				buildTime={buildTime}
			/>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={12}>
					<MovingAverageCard cases={indiaData.cases} days={14} />
					<MovingAverageCard cases={indiaData.cases} days={7} />
				</Col>
				<Col xs={24} sm={12}>
					<PeakChart />
				</Col>
			</Row>
			<HomePageTabsSecond stateDataLatest={stateDataLatest} />
		</>
	);
}

export async function getStaticProps() {
	const covidDataIndia = new CovidDataIndia();
	const testingData = await covidDataIndia.fetchTests();
	const indiaData = await covidDataIndia.fetchDataIndia();
	const stateDataLatest = await CovidDataState.latest();
	const buildTime = Utils.dateAndTime();

	return {
		// will be passed to the page component as props
		props: { indiaData, testingData, stateDataLatest, buildTime }
	};
}

export default Index;
