import React from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';
import MovingAverageProgress from '../MovingAverageProgress';
import MovingAverageCardChart from '../chartsv2/MovingAverageCardChart';
// import Utils from '../../classes/Utils';

const MovingAverageCard = React.memo(({ cases, days }) => {
	const latest = cases[cases.length - 1];
	const rateOfInc = days === 7 ? latest.movingAvg7daysRate : latest.movingAvg14daysRate;
	const movingAverage = []; const newCases = []; const dates = [];
	const newCasesLast7days = _.sum(_.map(_.takeRight(cases, 7), 'newCases'));
	cases.slice(days === 7 ? -8 : -15)
		.forEach(curr => {
			movingAverage.push(curr.movingAvg7days);
			newCases.push(curr.newCases);
			dates.push(curr.date);
		}, []);
	return (
		<>
			<Row className="trend-card" justify="space-between">
				<Col flex="60px">
					<div className="trend-card-title">{`${days} Day Change`}</div>
				</Col>
				<Col flex="1 0 80px" className="flex-row-center">
					<MovingAverageProgress rateOfInc={rateOfInc} newCases={newCasesLast7days} />
					<div className="trend-percent">{rateOfInc}%</div>
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
