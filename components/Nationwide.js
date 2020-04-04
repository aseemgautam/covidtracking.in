import { Statistic, Row, Col, Radio, Tag } from 'antd';
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
			title="Tests"
			value="38,976"
			precision={0}
		/>
	);
	return (
		<div>
			<Row className="national-radio" justify="space-between" align="middle">
				<Col flex={2}>
					<Radio.Group defaultValue={0}>
						<Radio.Button value={0}>India</Radio.Button>
						<Radio.Button value={1} disabled>World (coming soon)</Radio.Button>
					</Radio.Group>
				</Col>
				<Col flex>
					<Tag color="#87d068" className="live-tag">Live</Tag>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={16} sm={12}>
					{CovidStatisticFactory('Confirmed', 'Today', 3071, 525, 'red')}
				</Col>
				<Col xs={8} sm={6}>{active}</Col>
				<Col xs={0} sm={6}>{fatalityRate}</Col>
				<Col xs={16} sm={12}>
					{CovidStatisticFactory('Deaths', 'Today', 75, 13, 'red')}
				</Col>
				<Col xs={8} sm={0}>{fatalityRate}</Col>
				<Col xs={16} sm={12}>
					{CovidStatisticFactory('Recovered', 'Today', 212, 50, 'green')}
				</Col>
				<Col xs={8} sm={12}>{tests}</Col>
				<Col xs={24} sm={12}>
					<Statistic
						className="covid-statistic-with-suffix statistic-stage1"
						title={(
							<>
								<span>Stage</span>
								<span>Type</span>
							</>
						)}
						value="2"
						precision={0}
						suffix="Local Transmission"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Nationwide;
