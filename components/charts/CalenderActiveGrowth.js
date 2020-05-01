import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import _ from 'lodash';

const CalenderActiveGrowth = ({ cases, visible }) => {
	const container = useRef(null);
	const maxPercent = useRef(_.maxBy(cases, 'newActive').newActive);
	const chartRef = useRef(null);
	const dat = cases.slice(-28).map(
		(val, index) => {
			return {
				...val,
				week: Math.floor(index / 7),
				day: 6 - (index < 7 ? index : index % 7),
			};
		}
	);

	useEffect(() => {
		if (!container.current) {
			return;
		}
		if (!chartRef.current) {
			const chart = new Chart({
				container: container.current,
				autoFit: true,
				height: 400,
			});
			chartRef.current = chart;
			chart.data(dat);
			chart.legend(false);

			chart.scale('week', {
				type: 'cat'
			});
			chart.scale('day', {
				type: 'cat',
				values: ['1', '2', '3', '4', '5', '6', '7'],
			});
			chart.tooltip({
				showMarkers: false,
				showTitle: false,
			});
			chart.axis('week', false);
			chart.axis('day', false);
			chart
				.polygon()
				.position('week*day')
				.color('newActive', '#addd8e-#fef0d9-#fdd49e-#fdbb84-#fc8d59-#e34a33-#b30000')
				.label('newActive', value => {
					return {
						content: data => {
							return `${data.date.replace('2020-', '')} | ${data.percent}%\n${data.newActive}`;
						},
						offset: -2,
						style: {
							fill: value < maxPercent.current / 1.5 ? '#000' : '#fff',
							lineHeight: 18
						}
					};
				})
				.tooltip({
					fields: ['New Active Cases', '% inc from day before']
				})
				.style({
					lineWidth: 1,
					stroke: '#fff',
				});
			chart.render();
		}
		if (visible) chartRef.current.show(); else chartRef.current.hide();
	});
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default CalenderActiveGrowth;
