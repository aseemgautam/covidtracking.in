import _ from 'lodash';
import Utils from '../../classes/Utils';

class ChartSettings {
	constructor() {
		this.tooltip = {
			backgroundColor: '#fff',
			textStyle: {
				color: '#303030',
				fontSize: 11,
				fontFamily: 'SF Pro Text'
			},
			extraCssText: 'border-radius: 2px; padding: 8px; border: 1px solid #aaa'
		};
		this.grid = [{
			left: 0,
			right: 0,
			top: 30,
			height: '38%'
		}, {
			left: 0,
			right: 0,
			top: '46%',
			height: '38%'
		}];
		this.xAxis = {
			type: 'category',
			axisLabel: {
				formatter: value => {
					return Utils.shortMonthAndDate(value);
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#999'
				}
			}
		};
		this.yAxis = {
			type: 'value',
			show: true,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				align: 'left',
				inside: true,
				verticalAlign: 'bottom',
				showMinLabel: false,
				color: '#999',
				margin: 0,
				lineHeight: 18
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					width: 0.65
				}
			}
		};
		this.dataZoom = [
			{
				type: 'slider',
				start: 50,
				end: 100
			},
		];
		this.lineSeries = {
			type: 'line',
			smooth: false,
			symbol: null,
			animation: false,
			hoverAnimation: false,
			symbolSize: 0,
		};
		this.barSeries = {
			type: 'bar',
			barWidth: '80%',
			// symbol: null,
			animation: false,
			hoverAnimation: false
		};
	}

	getGraphicSettings = (first, second) => {
		return [
			{
				type: 'text',
				z: 100,
				style: {
					text: second,
					fill: '#aaa',
				},
				right: '10px',
				top: '200px'
			},
			{
				type: 'text',
				z: 100,
				style: {
					text: first,
					fill: '#aaa',
				},
				right: '10px',
				top: '10px'
			}
		];
	}

	getAxisIntervals = maxValue => {
		const intervals = [
			{ max: 10, minInterval: 2 },
			{ max: 20, minInterval: 5 },
			{ max: 50, minInterval: 10 },
			{ max: 100, minInterval: 25 },
			{ max: 200, minInterval: 50 },
			{ max: 500, minInterval: 100 },
			{ max: 800, minInterval: 200 },
			{ max: 1000, minInterval: 250 },
			{ max: 1500, minInterval: 500 },
			{ max: 2000, minInterval: 500 },
			{ max: 3000, minInterval: 1000 },
			{ max: 4000, minInterval: 1000 },
			{ max: 5000, minInterval: 1000 },
			{ max: 6000, minInterval: 1500 },
			{ max: 8000, minInterval: 2000 },
			{ max: 10000, minInterval: 2500 },
			{ max: 12000, minInterval: 3000 },
			{ max: 15000, minInterval: 3000 },
			{ max: 16000, minInterval: 4000 },
			{ max: 20000, minInterval: 5000 },
			{ max: 25000, minInterval: 5000 },
			{ max: 30000, minInterval: 6000 },
			{ max: 40000, minInterval: 8000 },
			{ max: 50000, minInterval: 10000 },
			{ max: 60000, minInterval: 15000 },
			{ max: 80000, minInterval: 20000 },
			{ max: 100000, minInterval: 25000 },
			{ max: 125000, minInterval: 25000 },
			{ max: 150000, minInterval: 30000 },
			{ max: 200000, minInterval: 50000 },
			{ max: 300000, minInterval: 60000 },
			{ max: 500000, minInterval: 100000 },
			{ max: 800000, minInterval: 200000 },
			{ max: 1000000, minInterval: 250000 },
			{ max: 1200000, minInterval: 300000 },
			{ max: 1500000, minInterval: 300000 },
		];
		return _.find(intervals, value => {
			return value.max > maxValue;
		});
	}
}

const chartSettings = new ChartSettings();
Object.freeze(chartSettings);
export default chartSettings;
