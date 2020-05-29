import { Row, Col } from 'antd';
import RateOfGrowthHelp from '../RateOfGrowthHelp';
import MovingAverageProgress from '../MovingAverageProgress';
import LineChartSmall from '../charts/LineChartSmall';

const MovingAverageCard = ({ cases, days }) => {
	const latest = cases[cases.length - 1];
	const rateOfInc = days === 7 ? latest.rollingAvg7daysRate : latest.rollingAvg14daysRate;
	const movingAverage = cases.slice(days === 7 ? -7 : -14)
		.map(curr => {
			return {
				date: curr.date,
				movingAverage: days === 7 ? curr.rollingAvg7days : curr.rollingAvg14days
			};
		});

	return (
		<Row className="trend-card" justify="space-between">
			<Col flex="70px">
				<RateOfGrowthHelp title={`${days} DAY MOVING AVERAGE`} className="ant-statistic-title" />
			</Col>
			<Col flex="1 0 120px" className="flex-row-center">
				<MovingAverageProgress rateOfInc={rateOfInc} />
				<div className="trend-percent">+{rateOfInc}%</div>
			</Col>
			<Col flex="1 0 120px" className="flex-row-center">
				<LineChartSmall
					fieldX="date"
					fieldY="movingAverage"
					width={200}
					widthSmall={120}
					height={70}
					data={movingAverage}
				/>
			</Col>
		</Row>
	);
};

export default MovingAverageCard;
