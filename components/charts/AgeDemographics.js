/* eslint-disable global-require */
import React, { useRef, useEffect } from 'react';

let g2Plot;

if (typeof window !== 'undefined') {
	g2Plot = require('@antv/g2plot');
}

const AgeDemographics = () => {
	const container = useRef(null);
	const data = [
		{ Age: '0 - 20', value: 8.61 },
		{ Age: '21 - 40', value: 41.88 },
		{ Age: '41 - 60', value: 32.82 },
		{ Age: 'Above 60', value: 16.69 },
	];
	useEffect(() => {
		if (!container.current) {
			return;
		}
		const barChart = new g2Plot.Bar(container.current, {
			forceFit: true,
			data,
			xAxis: {
				label: {
					visible: false
				},
				visible: true,
				title: {
					text: '% confirmed covid -19 cases'
				}
			},
			yAxis: true,
			xField: 'value',
			yField: 'Age',
			tooltip: {
				visible: false
			},
			label: {
				visible: true,
				formatter: text => {
					return [`${text}%`];
				}
			},
			renderer: 'svg'
		});
		barChart.render();
	}, [data]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default AgeDemographics;
