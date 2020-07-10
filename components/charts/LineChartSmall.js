import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';

const LineChartSmall = ({ data, width }) => {
	const [image, setImage] = useState(null);
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
				xAxis: {
					show: false,
					type: 'category',
					boundaryGap: false
				},
				grid: {
					left: 15,
					right: 15,
					bottom: 0,
					top: 15,
				},
				yAxis: {
					type: 'value',
					show: false,
					min: data[0] * 0.3,
				},
				series: [{
					data,
					type: 'line',
					smooth: true,
					symbol: null,
					animation: false,
					hoverAnimation: false,
					lineStyle: {
						color: '#595959',
						width: 2
					},
					itemStyle: {
						color: 'transparent'
					},
					areaStyle: {
						color: '#ddd'
					},
					label: {
						color: '#303030',
						show: true,
						fontSize: 10,
						fontWeight: 'normal',
						formatter: p => {
							return p.dataIndex === 0 || p.dataIndex === data.length - 1
								? p.value
								: '';
						}
					},
				}]
			}
		);
		const base64 = chart.getDataURL({ pixelRatio: window.devicePixelRatio, backgroundColor: 'transparent' });
		chart.clear();
		chart.dispose();
		setImage(base64);
	}, []);
	return (
		<>
			{image ? <img style={{ height: '55px' }} src={image} alt="" />
				: <div ref={container} />}
		</>
	);
};

export default LineChartSmall;
