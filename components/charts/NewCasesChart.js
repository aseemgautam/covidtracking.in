import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import Colors from '../../classes/Colors';

const NewCasesChart = ({ cases }) => {
	const container = useRef(null);

	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chartData = [];
		const isMobile = window.innerWidth < 576;
		let peak = 0;

		cases.slice(-30).forEach(d => {
			if (d.newCases > peak) peak = d.newCases;
			chartData.push(
				{ date: d.date, type: 'New Cases', value: d.newCases },
				{ date: d.date, type: 'Recovered', value: d.newRecover },
				{ date: d.date, type: 'Deaths', value: d.newDeaths },
				{ date: d.date, type: 'Active', value: 0, active: d.active });
		});

		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: isMobile ? 250 : 400,
			padding: [60, 24, 50, 5]
		});
		chart.axis('date', {
			tickLine: null,
			label: {
				formatter: text => {
					return text.replace('2020-', '');
				}
			}
		});
		chart.data(chartData);
		// Active
		chart.scale('active', {
			nice: true,
			alias: 'Active Cases',
			ticks: [20000, 40000, 50000, 60000]
		});
		chart.axis('active', {
			visible: true,
			title: {
				style: {
					fill: '#888',
					textAlign: 'right'
				}
			},
			tickLine: null,
			grid: null,
			offsetX: -7,
			offsetY: -10,
			label: {
				formatter: value => {
					return `${(value / 1000)}K`;
				}
			}
		});
		// Value, New Cases
		chart.axis('value', {
			offsetY: -10,
			offsetX: 36,
			label: {
				formatter: value => {
					return value <= 3000 ? '' : value;
				}
			}
		});
		chart.scale('value', {
			nice: true,
			alias: 'New Cases',
		});
		chart.scale('date', {
			type: 'timeCat',
			tickCount: 5
		});
		chart.legend({
			position: isMobile ? 'top-left' : 'top'
		});
		chart.tooltip({
			shared: true,
			showMarkers: false
		});

		chart
			.interval()
			.position(['date', 'value'])
			// .size(isMobile ? 18 : 23)
			.color('type', [Colors.newCasesStack, '#1a9641', '#d7191c', '#1890ff'])
			// .label('value')
			.label('value', value => {
				return {
					content: data => {
						if (data.type === 'New Cases' && data.value === peak) {
							return `Peak (${peak})`;
						}
						if (isMobile) return '';
						if (data.type === 'Active') return '';
						return data.value;
					},
					offset: 10,
					style: {
						fill: value === peak ? '#fc1600' : 'rgba(0, 0, 0, 0.65)',
						fontWeight: value === peak ? 500 : 400,
						fontSize: 11,
						// textAlign: 'right'
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
			.color('type', ['#597ef7'])
			.size(2)
			.shape('smooth');
		chart.interaction('active-region');
		chart.filter('type', type => { return type === 'New Cases' || type === 'Active'; });
		chart.render();
	}, [cases]);
	return (
		<>
			<div className="chart-wrapper new-cases-chart" ref={container} />
		</>
	);
};

export default NewCasesChart;
