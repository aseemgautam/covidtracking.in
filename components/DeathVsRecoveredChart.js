/* eslint-disable react/jsx-props-no-spreading */
import { ResponsiveBar } from '@nivo/bar';

const commonProps = {
	margin: { top: 30, right: 0, bottom: 30, left: 0 },
	padding: 0.2,
	labelTextColor: 'inherit:darker(1.4)',
	labelSkipWidth: 16,
	labelSkipHeight: 16,
};

const data = [
	{ date: '23/03', death: -3, recover: 10 },
	{ date: '24/03', death: 0, recover: 6 },
	{ date: '25/03', death: -2, recover: 3 },
	{ date: '26/03', death: -8, recover: 2 },
	{ date: '27/03', death: 0, recover: 28 },
	{ date: '28/03', death: -4, recover: 11 },
	{ date: '29/03', death: -3, recover: 11 },
	{ date: '30/03', death: -5, recover: 7 },
	{ date: '31/03', death: -3, recover: 21 }
];

const divergingCommonProps = {
	...commonProps,
	data,
	indexBy: 'date',
	minValue: -10,
	maxValue: 30,
	enableGridX: true,
	enableGridY: false,
	label: d => { return Math.abs(d.value); },
	labelTextColor: 'inherit:darker(1.2)',
	axisTop: {
		tickSize: 0,
		tickPadding: 12,
	},
	axisBottom: {
		// legend: 'Date',
		// legendPosition: 'middle',
		// legendOffset: 50,
		tickSize: 0,
		tickPadding: 12,
	},
	axisLeft: null,
	axisRight: {
		format: v => { return v; },
	},
	markers: [
		{
			axis: 'y',
			value: 0,
			lineStyle: { strokeOpacity: 0 },
			textStyle: { fill: '#2ebca6' },
			legend: 'recovered',
			legendPosition: 'top-left',
			legendOrientation: 'horizontal',
			legendOffsetY: 120,
		},
		{
			axis: 'y',
			value: 0,
			lineStyle: { stroke: '#f47560', strokeWidth: 1 },
			textStyle: { fill: '#e25c3b' },
			legend: 'deaths',
			legendPosition: 'bottom-left',
			legendOrientation: 'horizontal',
			legendOffsetY: 50,
		},
	],
};

const DeathVsRecoveredChart = () => {
	return (
		<div className="chart">
			<ResponsiveBar
				{...divergingCommonProps}
				keys={['recover', 'death']}
				padding={0.4}
				colors={['#97e3d5', '#f47560']}
				labelFormat={v => { return v; }}
			/>
		</div>
	);
};

export default DeathVsRecoveredChart;
