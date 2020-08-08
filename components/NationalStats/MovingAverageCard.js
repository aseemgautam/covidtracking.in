import React from 'react';
import { Row, Col } from 'antd';
import numeral from 'numeral';
import MovingAverageProgress from '../MovingAverageProgress';
import LineChartSmall from '../charts/LineChartSmall';

const MovingAverageCard = React.memo(({ cases, days }) => {
	const latest = cases[cases.length - 1];
	const rateOfInc = days === 7 ? latest.movingAvg7daysRate : latest.movingAvg14daysRate;
	const movingAverage = cases.slice(days === 7 ? -8 : -15)
		.reduce((acc, curr) => {
			acc.push(curr.movingAvg7days);
			return acc;
		}, []);
	return (
		<>
			<Row className="trend-card" justify="space-between">
				<Col flex="80px">
					<div className="trend-card-title">{`${days} DAY COVID % GROWTH`}</div>
				</Col>
				<Col flex="1 0 100px" className="flex-row-center">
					<MovingAverageProgress rateOfInc={rateOfInc} newCases={latest.newCases} />
					<div className="trend-percent">+{rateOfInc}%</div>
				</Col>
				<Col flex="1 0 140px" className="flex-row-center">
					<LineChartSmall
						fieldX="date"
						fieldY="movingAverage"
						data={movingAverage}
					/>
				</Col>
				{/* <Col span={24} className="trend-card-description">Average daily new cases have increased by {rateOfInc}% from&nbsp;
					{numeral(movingAverage[0]).format('0.0a')} to {numeral(movingAverage[days]).format('0.0a')} over last {days} days.
				</Col> */}
			</Row>
		</>
	);
});

export default MovingAverageCard;
