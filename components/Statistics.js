import { Row, Col, Card, Progress } from 'antd';
import { CovidStatisticFactory } from './CovidStatistic';
import Analytics from '../classes/Analytics';
import RateOfGrowthHelp from './RateOfGrowthHelp';

const Statistics = () => {
	const progressSettings = Analytics.getProgressColorAndPercent(Analytics.latest.rateOfInc7days);
	return (
		<>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.confirmed, 'statistic-confirmed', 'red6', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.active, 'statistic-active', 'red6', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.deaths, 'statistic-deaths', 'red6', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.recovered, 'statistic-recovered', 'green7', 0)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					{CovidStatisticFactory(Analytics.fatalityRate, '', '', 2)}
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<Card className="covid-statistic" bordered={false}>
						<RateOfGrowthHelp className="ant-statistic-title link" days={7} />
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
					{CovidStatisticFactory(Analytics.casesPer1L, '', 'green7', 2)}
				</Col>
				<Col xs={12} sm={12} lg={6}>
					{CovidStatisticFactory(Analytics.tests, '', 'green7', 0)}
				</Col>
			</Row>
		</>
	);
};

export default Statistics;
