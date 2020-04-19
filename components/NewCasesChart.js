import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const NewCasesChart = ({ cases }) => {
	const container = useRef(null);
	const formatted = [];
	let peak = 0;
	cases.forEach(d => {
		if (d.newCases > peak) peak = d.newCases;
		formatted.push({ date: d.date, type: 'New Cases', value: d.newCases },
			{ date: d.date, type: 'Deaths', value: d.newDeaths, color: '#f5222d' },
			{ date: d.date, type: 'Recovered', value: d.newRecover });
	});

	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400,
			padding: [40, 40]
		});
		chart.axis('date', {
			tickLine: null,
			label: {
				formatter: text => {
					return text.replace('2020-', '');
				}
			}
		});
		chart.data(formatted);
		chart.scale('value', {
			nice: false,
		});
		chart.legend({
			position: 'top',
		});
		chart.tooltip({
			shared: true,
			showMarkers: false,
		});
		chart
			.interval()
			.position(['date', 'value'])
			.color('type', ['#ffc53d', '#d7191c', '#1a9641'])
			.label('value', {
				content: data => {
					if (data.type === 'New Cases' && data.value === peak) {
						return `Peak (${peak})`;
					}
					return '';
				},
				offset: 10,
			})
			.adjust('stack');

		chart.interaction('active-region');

		chart.render();
	}, [formatted]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default NewCasesChart;
