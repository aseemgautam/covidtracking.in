import { Row, Col, Card, Progress } from 'antd';
import { CovidStatisticFactory } from './CovidStatistic';
import Analytics from '../classes/Analytics';
import RateOfGrowthHelp from './RateOfGrowthHelp';

const Statistics = () => {
	const progressSettings = Analytics.getProgressColorAndPercent(Analytics.latest.rateOfInc7days);
	return (
		<>
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>NATIONAL STATISTICS</h4>
					<div className="last-updated">Updated Daily at 9 AM</div>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.confirmed, 'statistic-confirmed', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.active, 'statistic-active', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.deaths, 'statistic-deaths', 'red', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.recovered, 'statistic-recovered', 'green', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.fatalityRate, '', '', 2)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<Card className="covid-statistic">
						<RateOfGrowthHelp className="ant-statistic-title" days={7} />
						<div className="weekly-rate ant-statistic-content">
							<Progress
								percent={progressSettings.percent}
								showInfo={false}
								status="normal"
								steps={4}
								strokeColor={progressSettings.color}
							/>
							<div>{Analytics.latest.rateOfInc7days}%</div>
						</div>
					</Card>
				</Col>
				<Col xs={12} sm={12} lg={6}>
					{CovidStatisticFactory(Analytics.casesPer1L, '', 'green', 2)}
				</Col>
				<Col xs={12} sm={12} lg={6}>
					{CovidStatisticFactory(Analytics.tests, '', 'green', 0)}
				</Col>
			</Row>
		</>
	);
};

export default Statistics;
