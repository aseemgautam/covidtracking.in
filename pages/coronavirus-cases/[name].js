import _ from 'lodash';
import numeral from 'numeral';
import { Row, Col } from 'antd';
import Head from 'next/head';
import CovidDataState from '../../classes/CovidDataState';
import IndiaStates from '../../public/india-states.json';
import NationalStats from '../../components/NationalStats';
import MovingAverageCard from '../../components/NationalStats/MovingAverageCard';
import NewCasesAndDeathsChart from '../../components/chartsv2/NewCasesAndDeathsChart';
import TestAndPositivityChart from '../../components/chartsv2/TestAndPositivityChart';
import Utils from '../../classes/Utils';

const CoronavirusCases = ({ stateStatistics, name }) => {
	const last = _.last(stateStatistics);
	const day = (new Date(last.date)).toLocaleString('en-IN', { weekday: 'long' });
	const cases = numeral(last.confirmed).format('0,0');
	const deaths = numeral(last.deaths).format('0,0');
	const movement = last.movingAvg7daysRate >= 0
		? `an increase of ${last.movingAvg7daysRate}` : ` a decrease of ${last.movingAvg7daysRate * -1}`;
	return (
		<>
			<Head>
				<title>Coronavirus cases & dashboard {name}</title>
			</Head>
			<h2>{name} Covid Cases & Dashboard</h2>
			<p>
				At least {last.newCases} new cases were reported in {name} on {Utils.shortMonthAndDate(last.date)}.
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
			<div className="subhead">Growth in daily cases over 7 & 14 days</div>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={stateStatistics} days={7} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={stateStatistics} days={14} />
				</Col>
			</Row>
			<p>
				Rate at which daily cases are increasing or decreasing. A negative value indicates
				a drop in daily cases. A 50% growth over 14 days means if we found 100 new cases
				daily (average, 14 days ago), today we find 150. Line = 7 day moving average. Bars = new cases.
			</p>
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
				<Col xs={24} sm={12}>
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
	const stateName = params.name.toLocaleLowerCase().split('-').join(' ');
	const stateStatistics = await CovidDataState.byName(stateName);
	if (_.last(stateStatistics).newCases === 0) {
		stateStatistics.pop();
	}
	return {
		// will be passed to the page component as props
		props: { stateStatistics, name: _.startCase(stateName) }
	};
}

export default CoronavirusCases;
