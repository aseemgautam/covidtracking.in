import { Statistic, Row, Col } from 'antd';
import { CovidStatisticFactory } from './CovidStatistic';

const Nationwide = () => {
	const fatalityRate = (
		<Statistic
			className="covid-statistic center"
			title="Fatality Rate"
			value="2.33%"
			precision={2}
		/>
	);
	const active = (
		<Statistic
			className="covid-statistic center"
			title="Active"
			value={2784}
			precision={0}
		/>
	);
	const tests = (
		<Statistic
			className="covid-statistic center"
			title="Total Covid-19 Tests"
			value="77,976"
			precision={0}
		/>
	);
	return (
		<>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory('statistic-confirmed', 'Confirmed', 0, 3071, 525, 'red', true)}
				</Col>
				<Col xs={12} sm={8} md={6}>{active}</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory('statistic-deaths', 'Deaths', 0, 75, 13, 'red', true)}
				</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory('statistic-recovered', 'Recovered', 0, 212, 50, 'green', true)}
				</Col>
				<Col xs={12} sm={8} md={6}>{fatalityRate}</Col>
				<Col xs={12} sm={8} md={6}>
					{CovidStatisticFactory('', 'Daily New Cases', 0, 212, 9, 'green', true)}
				</Col>
				<Col xs={12} sm={12} md={6}>
					{CovidStatisticFactory('', 'Cases Per 10L', 2, 0.01, 'Very Low', 'green', false)}
				</Col>
				<Col xs={12} sm={12} md={6}>{tests}</Col>
			</Row>
		</>
	);
};

export default Nationwide;
