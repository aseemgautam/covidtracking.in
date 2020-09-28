/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import numeral from 'numeral';
import { Row, Col, Statistic } from 'antd';
import Head from 'next/head';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import CovidDataState from '../../classes/CovidDataState';
import IndiaStates from '../../public/india-states.json';
import NationalStats from '../../components/NationalStats';
import MovingAverageCard from '../../components/NationalStats/MovingAverageCard';
import NewCasesAndDeathsChart from '../../components/chartsv2/NewCasesAndDeathsChart';
import TestAndPositivityChart from '../../components/chartsv2/TestAndPositivityChart';
import Utils from '../../classes/Utils';
import Colors from '../../classes/Colors';

const CoronavirusCases = ({ stateStatistics, name, buildTime, testingTrend, positivityTrend }) => {
	const last = _.last(stateStatistics);
	const day = (new Date(last.date)).toLocaleString('en-IN', { weekday: 'long' });
	const cases = numeral(last.confirmed).format('0,0');
	const deaths = numeral(last.deaths).format('0,0');
	const movement = last.movingAvg7daysRate >= 0
		? `an increase of ${last.movingAvg7daysRate}` : ` a decrease of ${last.movingAvg7daysRate * -1}`;
	// 14 day trend
	const growthInCases = last.movingAvg14daysRate;
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
				<title>Coronavirus cases & dashboard {name}</title>
			</Head>
			<h2>{name} Covid Cases & Dashboard</h2>
			<p>
				At least {last.newCases} new cases were reported in {name} on {Utils.shortMonthAndDateWithOrdinal(last.date)}.
				Over the past week, there have been an average of {last.movingAvg7days} cases per day,
				{movement} percent from the average two weeks earlier.
			</p>
			<p>
				As of {day} evening, there have been at least {cases} cases and
				{` ${deaths}`} deaths in {name} since the beginning of the pandemic, according to
				MOHFW.
			</p>
			{/* <p>Last updated: build time</p> */}
			<NationalStats
				latest={_.last(stateStatistics)}
				dailyStatistics={stateStatistics}
			/>
			<div className="subhead">New cases, Tests & Positivity over Last 14 days</div>
			<p style={{ marginTop: 16 }}>Over the last 2 weeks, new cases have {newCasesTrendText},
				daily tests have {testsTrendText} & positivity is {positivityTrendText}.
			</p>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={stateStatistics} days={14} title="New Cases" />
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
			<Row gutter={[24, 16]}>
				<Col xs={24} md={12}>
					<div className="flex-row-spread chart-title">
						<h4>New Cases & Deaths</h4>
					</div>
					<NewCasesAndDeathsChart
						newCases={_.map(stateStatistics, 'newCases')}
						dates={_.map(stateStatistics, 'date')}
						movingAverage={_.map(stateStatistics, 'movingAvg7days')}
						deaths={_.map(stateStatistics, 'newDeaths')}
						deathsMovingAverage={_.map(stateStatistics, 'newDeaths7DayMA')}
					/>
				</Col>
				<Col xs={24} md={12}>
					<div className="flex-row-spread chart-title">
						<h4>Daily Tests & Positivity</h4>
					</div>
					<TestAndPositivityChart
						tests={_.map(stateStatistics, 'newTests')}
						dates={_.map(stateStatistics, 'date')}
						movingAverage={_.map(stateStatistics, 'newTests7DayMA')}
						positivity={_.map(stateStatistics, 'dailyPositivity')}
						positivityMovingAverage={_.map(stateStatistics, 'dailyPositivity7DayMA')}
					/>
				</Col>
			</Row>
		</>
	);
};

export async function getStaticPaths() {
	const paths = [];
	IndiaStates.states.forEach(state => {
		if (state.name !== 'Lakshadweep') {
			paths.push({
				params: { name: state.name.toLocaleLowerCase().split(' ').join('-') }
			});
		}
	});
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	let stateName = _.startCase(params.name.toLocaleLowerCase().split('-').join(' '));
	if (stateName === 'Andaman And Nicobar Islands') {
		stateName = 'Andaman and Nicobar Islands';
	}
	if (stateName === 'Dadra And Nagar Haveli And Daman And Diu') {
		stateName = 'Dadra and Nagar Haveli and Daman and Diu';
	}
	if (stateName === 'Jammu And Kashmir') {
		stateName = 'Jammu and Kashmir';
	}
	const stateStatistics = await CovidDataState.byName(stateName);
	if (_.last(stateStatistics).newCases === 0 && _.last(stateStatistics).newRecover === 0) {
		stateStatistics.pop();
	}
	const buildTime = Utils.dateAndTime();
	const testingTrend = ((_.last(stateStatistics).newTests7DayMA - _.nth(stateStatistics, -15).newTests7DayMA) * 100)
		/ _.nth(stateStatistics, -15).newTests7DayMA;
	const positivityTrend = _.last(stateStatistics).dailyPositivity7DayMA
		- _.nth(stateStatistics, -15).dailyPositivity7DayMA;
	return {
		// will be passed to the page component as props
		props: { stateStatistics,
			name: _.startCase(stateName),
			buildTime,
			testingTrend: numeral(testingTrend).format('0.00'),
			positivityTrend: numeral(positivityTrend).format('0.00') }
	};
}

export default CoronavirusCases;
