import React from 'react';
import { Row, Col } from 'antd';
import numeral from 'numeral';
import MovingAverageCardChart from '../chartsv2/MovingAverageCardChart';
import TrendIndicator from '../TrendIndicator';

const MovingAverageCard = React.memo(({ cases, days, title }) => {
	const latest = cases[cases.length - 1];
	const rateOfInc = days === 7 ? latest.movingAvg7daysRate : latest.movingAvg14daysRate;
	const movingAverage = []; const newCases = []; const dates = [];
	cases.slice(days === 7 ? -8 : -15)
		.forEach(curr => {
			movingAverage.push(curr.movingAvg7days);
			newCases.push(curr.newCases);
			dates.push(curr.date);
		}, []);
	return (
		<>
			<Row className="trend-card" justify="space-between">
				<Col flex="70px">
					<div className="trend-card-title">{title}</div>
				</Col>
				<Col flex="0 0 120px" className="flex-row-center">
					<TrendIndicator value={numeral(rateOfInc).format('0.00')} isPercent reverse width={72} />
				</Col>
				<Col flex="1 0 120px" className="flex-row-center">
					<MovingAverageCardChart
						fieldX="date"
						fieldY="movingAverage"
						data={movingAverage}
						newCases={newCases}
						dates={dates}
					/>
				</Col>
			</Row>
		</>
	);
});

export default MovingAverageCard;
