import _ from 'lodash';
import { Row, Col } from 'antd';
import Head from 'next/head';
import CovidDataState from '../../classes/CovidDataState';
import IndiaStates from '../../public/india-states.json';
import NationalStats from '../../components/NationalStats';
import MovingAverageCard from '../../components/NationalStats/MovingAverageCard';
import NewCasesAndDeathsChart from '../../components/chartsv2/NewCasesAndDeathsChart';
import TestAndPositivityChart from '../../components/chartsv2/TestAndPositivityChart';

const CoronavirusCases = ({ stateStatistics, name }) => {
	// console.log(stateDataLatest);
	return (
		<>
			<Head>
				<title>Coronavirus cases & dashboard {name}</title>
			</Head>
			<h2>{name}</h2>
			{/* <p>Last updated: build time</p> */}
			<NationalStats
				latest={_.last(stateStatistics)}
				dailyStatistics={stateStatistics}
				showDateOptions
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
						<h4>Daily Tests & Positivity (+VE) Rate</h4>
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
				params: { name: state.name.split(' ').join('-') }
			});
		}
	});
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const stateStatistics = await CovidDataState.all();
	const stateName = params.name.split('-').join(' ');
	return {
		// will be passed to the page component as props
		props: { stateStatistics: stateStatistics.get(stateName), name: stateName }
	};
}

export default CoronavirusCases;
