/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import Analytics from '../../classes/Analytics';

const TestingChart = () => {
	const container = useRef(null);

	useEffect(() => {
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400,
			padding: [50, 0, 50, 0]
		});
		chart.data(Analytics.testingData.slice(-22));
		chart.axis('value', false);
		chart.axis('date', {
			tickLine: null,
			label: {
				formatter: text => {
					return text.replace('2020-', '');
				}
			}
		});
		chart.scale('date', {
			type: 'timeCat'
		});
		chart.legend({
			position: 'top',
		});
		chart.tooltip({
			shared: true,
			showMarkers: false
		});
		chart
			.interval()
			.position(['date', 'value'])
			.color('type', type => {
				if (type === 'Samples') return '#d9d9d9';
				return '#f5222d';
			})
			.label('value')
			.adjust([
				{
					type: 'stack'
				},
			]);
		chart.render();
	}, []);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default TestingChart;
