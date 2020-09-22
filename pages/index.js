/* eslint-disable no-restricted-syntax */
import { Row, Col } from 'antd';
import Head from 'next/head';
import _ from 'lodash';
import CovidDataIndia from '../classes/CovidDataIndia';
import MovingAverageCard from '../components/NationalStats/MovingAverageCard';
import CovidDataState from '../classes/CovidDataState';
import HomePageTabsFirst from '../components/HomePageTabsFirst';
import HomePageTabsSecond from '../components/HomePageTabsSecond';
import Utils from '../classes/Utils';
import DailyStatistic from '../classes/DailyStatistic';

function Index({ indiaDailyStats, latest, stateDataLatest, buildTime }) {
	return (
		<>
			<Head>
				<title>Covid-19 Tracking India</title>
			</Head>
			<HomePageTabsFirst
				latest={latest}
				indiaDailyStats={indiaDailyStats}
				stateDataLatest={stateDataLatest}
				buildTime={buildTime}
			/>
			<div className="subhead">Growth in daily cases over 7 & 14 days</div>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={indiaDailyStats} days={7} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={indiaDailyStats} days={14} />
				</Col>
			</Row>
			<p>
				Rate at which daily cases are increasing or decreasing. A negative value indicates
				a drop in daily cases. A 50% growth over 14 days means if we found 100 new cases
				daily (average, 14 days ago), today we find 150. Line = 7 day moving average. Bars = new cases.
			</p>
			<HomePageTabsSecond stateDataLatest={stateDataLatest} />
		</>
	);
}

export async function getStaticProps() {
	const covidDataIndia = new CovidDataIndia();
	const indiaDailyStats = await covidDataIndia.fetchDataIndia();
	const stateDataLatest = await CovidDataState.latest();
	const buildTime = Utils.dateAndTime();

	let confirmed = 0; let recovered = 0; let deaths = 0; let tests = 0;
	let active = 0; let count = 0;
	for (let i = 0; i < stateDataLatest.length; i++) {
		confirmed += stateDataLatest[i].newCases;
		recovered += stateDataLatest[i].newRecover;
		deaths += stateDataLatest[i].newDeaths;
		tests += stateDataLatest[i].newTests;
		if (stateDataLatest[i].newCases > 0 || stateDataLatest[i].newRecovered > 0) {
			count += 1;
		}
	}
	active = confirmed - deaths - recovered;
	const indiaLatest = _.last(indiaDailyStats);
	let latest = new DailyStatistic(Utils.getDefaultDateFormat(new Date(stateDataLatest[0].date)),
		indiaLatest.confirmed + confirmed, confirmed,
		indiaLatest.active + active, active,
		indiaLatest.recovered + recovered,
		recovered, indiaLatest.deaths + deaths, deaths, indiaLatest.tests + tests,
		tests);
	latest.count = count;
	if (latest.date === _.last(indiaDailyStats).date) {
		latest = [];
	}
	return {
		// will be passed to the page component as props
		props: { indiaDailyStats, latest: JSON.parse(JSON.stringify(latest)), stateDataLatest, buildTime }
	};
}

export default Index;
