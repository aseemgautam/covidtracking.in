import React from 'react';
import { Row, Col } from 'antd';
import MovingAverageProgress from '../MovingAverageProgress';
import LineChartSmall from '../charts/LineChartSmall';

const MovingAverageCard = React.memo(({ cases, days }) => {
	const latest = cases[cases.length - 1];
	const rateOfInc = days === 7 ? latest.movingAvg7daysRate : latest.movingAvg14daysRate;
	const movingAverage = cases.slice(days === 7 ? -8 : -15)
		.map(curr => {
			return {
				date: curr.date,
				movingAverage: curr.movingAvg7days
			};
		});

	return (
		<>
			<Row className="trend-card" justify="space-between">
				<Col flex="80px">
					<div className="ant-statistic-title">{`${days} DAY TREND COVID+`}</div>
				</Col>
				<Col flex="1 0 120px" className="flex-row-center">
					<MovingAverageProgress rateOfInc={rateOfInc} newCases={latest.newCases} />
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
				<Col span={24} className="trend-card-description">Average daily new cases have increased by {rateOfInc}% from &nbsp;
					{movingAverage[0].movingAverage} to {movingAverage[6].movingAverage} over the last {days} days.
				</Col>
			</Row>
		</>
	);
});

export default MovingAverageCard;
