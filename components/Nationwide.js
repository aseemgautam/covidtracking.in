import { Row, Col } from 'antd';
import { CovidStatisticFactory } from './CovidStatistic';
import Analytics from '../classes/Analytics';

const Nationwide = () => {
	return (
		<>
			<Row>
				<Col flex={24} className="tracker-title">
					<h1>COVID-19 TRACKER</h1>
					<div className="last-updated">Last Updated 7 hours ago</div>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.confirmed, 'statistic-confirmed', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.active, 'statistic-active', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.deaths, 'statistic-deaths', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.recovered, 'statistic-recovered', 'green', 0)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.fatalityRate, '', '', 2)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory(Analytics.weeklyTrend, '', 'red', 0)}
				</Col>
				<Col xs={12} sm={12} md={6}>
					{CovidStatisticFactory(Analytics.casesPer1L, '', 'green', 2)}
				</Col>
				<Col xs={12} sm={12} md={6}>
					{CovidStatisticFactory(Analytics.tests, '', 'green', 0)}
				</Col>
			</Row>
		</>
	);
};

export default Nationwide;
