import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import line from 'echarts/lib/chart/line';
import tooltip from 'echarts/lib/component/tooltip';
import numeral from 'numeral';

const MovingAverageCardChart = ({ data, width, newCases }) => {
	// const [image, setImage] = useState(null);
	const container = useRef(null);
	const chartWidth = useRef(0);
	useEffect(() => {
		if (!container.current || !data) {
			return;
		}
		chartWidth.current = width || container.current.parentElement.offsetWidth - 16;
		const chart = echarts.init(container.current, {},
			{ width: chartWidth.current, height: 55 });
		chart.setOption(
			{
				tooltip: {
					show: true
				},
				backgroundColor: 'transparent',
				xAxis: {
					type: 'category',
					boundaryGap: false
				},
				grid: {
					left: 15,
					right: 15,
					bottom: 0,
					top: 15,
					backgroundColor: 'transparent'
				},
				yAxis: {
					type: 'value',
					show: false,
					min: data[0] * 0.5,
				},
				series: [{
					data,
					type: 'line',
					smooth: false,
					symbol: null,
					animation: false,
					// hoverAnimation: false,
					lineStyle: {
						color: '#CF1110',
						width: 2
					},
					itemStyle: {
						color: 'transparent'
					},
					label: {
						color: '#303030',
						show: true,
						fontSize: 12,
						fontWeight: 'normal',
						formatter: p => {
							const text = p.value > 9999 ? numeral(p.value).format('0.0a') : p.value;
							return p.dataIndex === 0 || p.dataIndex === data.length - 1
								? text
								: '';
						}
					},
				},
				{
					type: 'bar',
					data: newCases,
					color: '#ffccc7',
					barWidth: '97%',
					// symbol: null,
					animation: false,
					hoverAnimation: false,
				}]
			}
		);
	}, []);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default MovingAverageCardChart;
