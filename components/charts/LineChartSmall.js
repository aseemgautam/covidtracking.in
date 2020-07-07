import React, { useRef, useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';

const LineChartSmall = ({ data, width, }) => {
	const container = useRef(null);
	useEffect(() => {
		if (!container.current || !data) {
			return;
		}
		const chartWidth = width || container.current.parentElement.offsetWidth - 16;
		const chart = echarts.init(container.current, {},
			{ width: chartWidth, height: 55 });
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
		// const parentWidth = container.current.parentElement.offsetWidth;
		// const chart = new Chart({
		// 	container: container.current,
		// 	autoFit: true,
		// 	height: height ?? 60,
		// 	width: autoSize ? parentWidth - 16 : width,
		// 	padding: [15, 20, 0, 20]
		// });
		// chart.annotation().text({
		// 	content: data[0][fieldY],
		// 	position: [data[0][fieldX], data[0][fieldY]],
		// 	offsetX: -15,
		// 	offsetY: -10,
		// 	style: {
		// 		fontSize: 10
		// 	}
		// });
		// chart.annotation().text({
		// 	content: data[data.length - 1][fieldY],
		// 	position: [data[data.length - 1][fieldX], data[data.length - 1][fieldY]],
		// 	offsetX: -15,
		// 	offsetY: -10,
		// 	style: {
		// 		fontSize: 10
		// 	}
		// });

		// chart.data(data);
		// chart.axis(fieldY, false);
		// chart.scale({
		// 	[fieldY]: {
		// 		nice: true,
		// 		min: 0
		// 	},
		// 	[fieldX]: {
		// 		range: [0, 1],
		// 	},
		// });

		// chart.tooltip(false);

		// chart.area().position(`${fieldX}*${fieldY}`).color('#bfbfbf');
		// chart.line().position(`${fieldX}*${fieldY}`).size(2).color('#595959').shape('smooth');

		// chart.render();
	}, [data]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default LineChartSmall;
