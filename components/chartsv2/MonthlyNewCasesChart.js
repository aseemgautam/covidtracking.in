import { useRef, useEffect, useState } from 'react';
// import echarts from 'echarts';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import _ from 'lodash';
import Colors from '../../classes/Colors';

const MonthlyNewCasesChart = ({ data }) => {
	const [image, setImage] = useState(null);
	const container = useRef(null);
	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chart = echarts.init(container.current, {}, { width: 250, height: 30 });
		// draw chart
		chart.setOption({
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: 0,
				right: 0,
				// bottom: 0,
				// top: 0,
				// bottom: '0%',
				// height: 50,
				// containLabel: true
			},
			xAxis: {
				type: 'value',
				show: false,
				min: 0,
				max: _.sum(data),
			},
			yAxis: {
				type: 'category',
				show: false,
				data: ['New Cases in Last 28 Days']
			},
			series: [
				{
					name: '0-7',
					type: 'bar',
					stack: 'cases',
					animation: false,
					itemStyle: {
						color: Colors.monthlyNewCasesChart[0]
					},
					label: {
						color: '#fff',
						show: true,
						position: 'inside'
					},
					data: [data[0]]
				},
				{
					name: '8-14',
					type: 'bar',
					stack: 'cases',
					animation: false,
					itemStyle: {
						color: Colors.monthlyNewCasesChart[1]
					},
					label: {
						color: '#fff',
						show: true,
						position: 'inside'
					},
					data: [data[1]]
				},
				{
					name: '15-21',
					type: 'bar',
					stack: 'cases',
					animation: false,
					itemStyle: {
						color: Colors.monthlyNewCasesChart[2]
					},
					label: {
						color: '#fff',
						show: true,
						position: 'inside'
					},
					data: [data[2]]
				},
				{
					name: '22-28',
					type: 'bar',
					stack: 'cases',
					animation: false,
					itemStyle: {
						color: Colors.monthlyNewCasesChart[3],
					},
					label: {
						color: '#fff',
						show: true,
						position: 'inside'
					},
					data: [data[3]]
				}
			]
		});
		const base64 = chart.getDataURL({ pixelRatio: window.devicePixelRatio });
		chart.clear();
		chart.dispose();
		setImage(base64);
	}, [data]);
	return (
		<>
			{image ? <img style={{ height: '30px' }} src={image} alt="" />
				: <div className="monthlyNewCasesChart" ref={container} />}
		</>
	);
};

export default MonthlyNewCasesChart;
