import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const NewCasesChart = ({ cases }) => {
	const container = useRef(null);
	const formatted = [];
	let peak = 0;
	cases.forEach(d => {
		if (d.newCases > peak) peak = d.newCases;
		formatted.push(
			{ date: d.date, type: 'New Cases', value: d.newCases },
			{ date: d.date, type: 'Deaths', value: d.newDeaths },
			{ date: d.date, type: 'Recovered', value: d.newRecover },
			{ date: d.date, type: 'Active', value: 0, active: d.active });
	});

	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400,
			padding: [40, 60, 40, 40]
		});
		chart.axis('date', {
			tickLine: null,
			label: {
				formatter: text => {
					return text.replace('2020-', '');
				}
			}
		});
		chart.axis('active', {
			tickLine: null,
			grid: null
		});
		chart.data(formatted);
		chart.scale('active', {
			nice: true
		});
		chart.scale('value', {
			nice: true,
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
			.color('type', ['#ffc53d', '#d7191c', '#1a9641', '#1890ff'])
			// .label('value')
			.label('value', value => {
				return {
					content: data => {
						if (data.type === 'New Cases' && data.value === peak) {
							return `Peak (${peak})`;
						}
						if (data.type === 'Active') return '';
						return data.value;
					},
					offset: 10,
					style: {
						fill: value === peak ? '#fc1600' : 'rgba(0, 0, 0, 0.65)',
						fontWeight: value === peak ? 500 : 400,
						fontSize: 11
					}
				};
			})
			.adjust([
				{
					type: 'stack'
				},
			]);

		chart
			.line()
			.position('date*active')
			.color('type', ['#1890ff'])
			.size(2)
			.shape('smooth');
		chart.interaction('active-region');
		chart.filter('type', type => { return type === 'New Cases' || type === 'Active'; });
		// chart.
		chart.render();
	}, [formatted, peak]);
	return (
		<>
			<div className="new-cases-chart" ref={container} />
		</>
	);
};

export default NewCasesChart;
