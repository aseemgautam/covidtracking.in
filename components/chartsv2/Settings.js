import Utils from '../../classes/Utils';

class ChartSettings {
	constructor() {
		this.tooltip = {
			trigger: 'axis',
			backgroundColor: '#fff',
			textStyle: {
				color: '#303030',
				fontSize: 11,
				fontFamily: 'SF Pro Text'
			}
		};
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
		this.grid = {
			left: 5,
			right: 5,
			bottom: 20,
			top: 20,
		};
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
}

const chartSettings = new ChartSettings();
Object.freeze(chartSettings);
export default chartSettings;
