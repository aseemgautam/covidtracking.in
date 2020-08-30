/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import line from 'echarts/lib/chart/line';
import tooltip from 'echarts/lib/component/tooltip';
import dataZoom from 'echarts/lib/component/dataZoom';
import legend from 'echarts/lib/component/legend';
import axisPointer from 'echarts/lib/component/axisPointer';
import numeral from 'numeral';
import Utils from '../../classes/Utils';
import chartSettings from './Settings';

const NewCasesAndDeathsChart = ({ newCases, movingAverage, dates, deaths }) => {
	const container = useRef(null);
	const chartWidth = useRef(0);
	useEffect(() => {
		if (!container.current) {
			return;
		}
		chartWidth.current = container.current.parentElement.offsetWidth;
		const chart = echarts.init(container.current, {},
			{ width: 'auto', height: 500 });
		chart.setOption(
			{
				tooltip: {
					...chartSettings.tooltip,
					formatter: params => {
						return `<b>${Utils.longMonthAndDate(params[0].name)}</b> <br />New Cases: ${newCases[params[0].dataIndex]}
							<br />7-day average: ${numeral(dates[params[0].dataIndex]).format('0,0')}
							<br />Deaths: ${deaths[params[0].dataIndex]}`;
					},
					axisPointer: {
						animation: false
					},
					extraCssText: 'border-radius: 2px; padding: 8px; border: 1px solid #aaa'
				},
				dataZoom: {
					show: true,
					xAxisIndex: [0, 1],
					start: 50,
					end: 100,
				},
				legend: {
					data: ['New Cases', '7 day average', 'Deaths'],
					left: -5
				},
				xAxis: [{
					data: dates,
					...chartSettings.xAxis,
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					show: true,
				},
				{
					data: dates,
					gridIndex: 1,
					...chartSettings.xAxis
				}],
				axisPointer: {
					link: { xAxisIndex: 'all' }
				},
				grid: [{
					left: 0,
					right: 10,
					top: 60,
					height: '35%'
				}, {
					left: 0,
					right: 10,
					top: '53%',
					height: '35%'
				}],
				yAxis: [{
					...chartSettings.yAxis,
					minInterval: 20000,
					max: 80000,
				}, {
					...chartSettings.yAxis,
					gridIndex: 1,
					minInterval: 1000,
					max: 2000
				}],
				series: [
					{
						...chartSettings.lineSeries,
						name: '7 day average',
						data: movingAverage,
						lineStyle: {
							color: '#CF1110',
							width: 2
						},
						areaStyle: {
							color: '#FAE6E6'
						},
					},
					{
						...chartSettings.barSeries,
						name: 'New Cases',
						data: newCases,
						color: '#FAC9C7',
						emphasis: {
							itemStyle: {
								color: '#F87E7B'
							}
						},
					},
					{
						...chartSettings.barSeries,
						name: 'Deaths',
						data: deaths,
						color: '#bbb',
						xAxisIndex: 1,
						yAxisIndex: 1,
						emphasis: {
							itemStyle: {
								color: '#666'
							}
						},
					},
				]
			}
		);
		function handleResize() {
			chart.resize();
		}
		window.addEventListener('resize', handleResize);
	}, [newCases, movingAverage, dates, deaths]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default NewCasesAndDeathsChart;
