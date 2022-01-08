/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { Row, Col, Statistic } from 'antd';
import Head from 'next/head';
import _ from 'lodash';
import numeral from 'numeral';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import CovidDataIndia from '../classes/CovidDataIndia';
import MovingAverageCard from '../components/NationalStats/MovingAverageCard';
import CovidDataState from '../classes/CovidDataState';
import HomePageTabsFirst from '../components/HomePageTabsFirst';
import HomePageTabsSecond from '../components/HomePageTabsSecond';
import Utils from '../classes/Utils';
import DailyStatistic from '../classes/DailyStatistic';
import Colors from '../classes/Colors';

function Index({ indiaDailyStats, latest, stateDataLatest, buildTime, testingTrend, positivityTrend }) {
	const growthInCases = _.last(indiaDailyStats).movingAvg7daysRate;
	const newCasesTrendText = growthInCases === 0 ? 'are flat (not changed)'
		: growthInCases > 0 ? `increased by ${growthInCases}%`
			: `decreased by ${Math.abs(growthInCases)}%`;
	const testsTrendText = testingTrend === 0 ? 'are flat (not changed)'
		: testingTrend > 0 ? `increased by ${testingTrend}%`
			: `decreased by ${Math.abs(testingTrend)}%`;
	const positivityTrendText = positivityTrend === 0 ? 'is same'
		: positivityTrend > 0 ? `is up by ${positivityTrend}%`
			: `down by ${Math.abs(positivityTrend)}%`;
	const testingTrendIcon = testingTrend > 0 ? <ArrowUpOutlined style={{ color: Colors.green }} />
		: <ArrowDownOutlined style={{ color: Colors.red }} />;
	const positivityTrendIcon = positivityTrend > 0 ? <ArrowUpOutlined style={{ color: Colors.red }} />
		: <ArrowDownOutlined style={{ color: Colors.green }} />;
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
			<div className="subhead">New cases, Tests & Positivity over Last 7 days</div>
			<p style={{ marginTop: 16 }}>Over the last 7, new cases have {newCasesTrendText},
				daily tests have {testsTrendText} & positivity is {positivityTrendText}.
			</p>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={indiaDailyStats} days={7} title="New Cases" />
				</Col>
				<Col xs={12} md={6}>
					<div className={`${testingTrend > 0 ? 'statistic-green' : 'statistic-red'} covid-statistic`}>
						<Statistic
							title="Daily Tests"
							value={Math.abs(testingTrend)}
							prefix={testingTrendIcon}
							suffix="%"
						/>
					</div>
				</Col>
				<Col xs={12} md={6}>
					<div className={`${positivityTrend > 0 ? 'statistic-red' : 'statistic-green'} covid-statistic`}>
						<Statistic
							title="Positivity Rate"
							value={Math.abs(positivityTrend)}
							prefix={positivityTrendIcon}
							suffix="%"
						/>
					</div>
				</Col>
			</Row>
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
	const latest = new DailyStatistic(Utils.getDefaultDateFormat(new Date(stateDataLatest[0].date)),
		indiaLatest.confirmed + confirmed, confirmed,
		indiaLatest.active + active, active,
		indiaLatest.recovered + recovered,
		recovered, indiaLatest.deaths + deaths, deaths, indiaLatest.tests + tests,
		tests);
	latest.count = count;
	const testingTrend = ((_.last(indiaDailyStats).newTests7DayMA - _.nth(indiaDailyStats, -8).newTests7DayMA) * 100)
		/ _.nth(indiaDailyStats, -8).newTests7DayMA;
	const positivityTrend = _.last(indiaDailyStats).dailyPositivity7DayMA
		- _.nth(indiaDailyStats, -8).dailyPositivity7DayMA;
	return {
		// will be passed to the page component as props
		props: { indiaDailyStats,
			latest: JSON.parse(JSON.stringify(latest)),
			stateDataLatest,
			buildTime,
			testingTrend: numeral(testingTrend).format('0.00'),
			positivityTrend: numeral(positivityTrend).format('0.00') }
	};
}

export default Index;
