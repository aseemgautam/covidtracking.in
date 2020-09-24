/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import numeral from 'numeral';
import { Row, Col } from 'antd';
import Head from 'next/head';
import Districts from '../../../classes/Districts';
import Utils from '../../../classes/Utils';
import NationalStats from '../../../components/NationalStats';
import MovingAverageCard from '../../../components/NationalStats/MovingAverageCard';
import NewCasesAndDeathsChart from '../../../components/chartsv2/NewCasesAndDeathsChart';

const DistrictPage = ({ districtData, state, name }) => {
	const last = _.last(districtData);
	// console.log(last);
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
				At least {last.newCases} new cases were reported in {name}, {state} on {Utils.shortMonthAndDateWithOrdinal(last.date)}.
				Over the past week, there have been an average of {last.movingAvg7days} cases per day,
				{movement} percent from the average two weeks earlier.
			</p>
			<p>
				As of {day} evening, there have been at least {cases} cases and
				{` ${deaths}`} deaths in {name}, {state} since the beginning of the pandemic, according to
				MOHFW.
			</p>
			{/* <p>Last updated: build time</p> */}
			<NationalStats
				latest={_.last(districtData)}
				dailyStatistics={districtData}
			/>
			<div className="subhead">Growth in daily cases over 7 & 14 days</div>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={districtData} days={7} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={districtData} days={14} />
				</Col>
			</Row>
			<p>
				Rate at which daily cases are increasing or decreasing. A negative value indicates
				a drop in daily cases. A 50% growth over 14 days means if we found 100 new cases
				daily (average, 14 days ago), today we find 150. Line = 7 day moving average. Bars = new cases.
			</p>
			<Row gutter={[24, 16]}>
				<Col span={24}>
					<div className="flex-row-spread chart-title">
						<h4>New Cases & Deaths</h4>
					</div>
					<NewCasesAndDeathsChart
						newCases={_.map(districtData, 'newCases')}
						dates={_.map(districtData, 'date')}
						movingAverage={_.map(districtData, 'movingAvg7days')}
						deaths={_.map(districtData, 'newDeaths')}
						deathsMovingAverage={_.map(districtData, 'newDeaths7DayMA')}
					/>
				</Col>
			</Row>
		</>
	);
};

export async function getStaticPaths() {
	const paths = [];
	const districts = await Districts.latest();
	districts.forEach(district => {
		const stateName = district.state.toLocaleLowerCase().split(' ').join('-');
		const districtName = district.district.toLocaleLowerCase().split(' ').join('-').split('.')
			.join('');
		paths.push({
			params: { name: stateName, district: districtName }
		});
	});
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	let stateName = _.startCase(params.name.toLocaleLowerCase().split('-').join(' '));
	let districtName = _.startCase(params.district.toLocaleLowerCase().split('-').join(' ')).replace(' And ', ' and ');

	if (stateName === 'Andaman And Nicobar Islands') {
		stateName = 'Andaman and Nicobar Islands';
	}
	if (stateName === 'Dadra And Nagar Haveli And Daman And Diu') {
		stateName = 'Dadra and Nagar Haveli and Daman and Diu';
	}
	if (stateName === 'Jammu And Kashmir') {
		stateName = 'Jammu and Kashmir';
	}

	if (districtName === 'Saraikela Kharsawan') {
		districtName = 'Saraikela-Kharsawan';
	}

	if (districtName === 'Sps Nellore') {
		districtName = 'S.P.S. Nellore';
	}

	if (districtName === 'Ysr Kadapa') {
		districtName = 'Y.S.R. Kadapa';
	}

	if (districtName === 'Sas Nagar') {
		districtName = 'S.A.S. Nagar';
	}

	const districtData = await Districts.single(stateName, districtName);
	if (_.last(districtData).newCases === 0 && _.last(districtData).newRecover === 0) {
		districtData.pop();
	}
	return { props: { districtData, state: stateName, name: districtName } };
}

export default DistrictPage;
