/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import Colors from '../../classes/Colors';

const TestingChart = ({ testingData }) => {
	const container = useRef(null);

	useEffect(() => {
		const isMobile = window.innerWidth < 576;
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: isMobile ? 250 : 400,
			padding: [50, 10, 50, 26]
		});
		chart.data(testingData.slice(-48));
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
		chart.scale('value', {
			nice: true,
			// ticks: [40000, 80000, 100000]
		});
		chart.axis('value', {
			offsetX: 8,
			label: {
				formatter: value => {
					return `${(value / 1000)}K`;
				}
			}
		});
		chart.legend({
			position: isMobile ? 'top-left' : 'top',
			offsetX: isMobile ? -25 : 0
		});
		chart.tooltip({
			shared: true,
			showMarkers: false
		});
		chart
			.interval()
			// .size(27)
			.position(['date', 'value'])
			.color('type', type => {
				if (type === 'Samples') return Colors.testingSampleStack;
				return '#ff4d4f';
			})
			.label('value', () => {
				return {
					content: data => {
						if (isMobile) return '';
						if (data.type === 'Positive') {
							return `${data.value} \n${data.percent}%\n`;
						}
						return data.value;
					},
					offset: 10,
					style: {
						fontSize: 11
					}
				};
			})
			.adjust([
				{
					type: 'stack'
				},
			]);
		chart.interaction('active-region');
		chart.render();
	}, []);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default TestingChart;
