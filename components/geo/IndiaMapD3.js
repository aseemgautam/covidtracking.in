/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import IndiaJson from '../../public/india.json';
import Analytics from '../../classes/Analytics';

const IndiaMap = React.memo(() => {
	const cases = [];
	// eslint-disable-next-line no-restricted-syntax
	const container = useRef(null);
	function getTrendValue(value) {
		if (value < 50) return '< 50';
		if (value > 50 && value < 200) return '50-200';
		if (value > 200 && value <= 500) return '200-500';
		if (value > 500 && value <= 1000) return '500 - 1000';
		if (value > 1000 && value <= 2000) return '1k-2k';
		if (value > 2000) return '>2k';
		return 'No Cases';
	}
	// '#52c41a', '#95de64', '#fff566', '#ffc53d', '#ffa940', '#ffa39e', '#f5222d'
	function getTrendColor(value) {
		if (value === '<50') return '#fef0d9';
		if (value === '50-200') return '#fef0d9';
		if (value === '200-500') return '#fdbb84';
		if (value === '500 - 1000') return '#fc8d59';
		if (value === '1k-2k') return '#e34a33';
		if (value === '>2k') return '#b30000';
		return '#fef0d9';
	}
	useEffect(() => {
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400,
			padding: [10, 5]
		});
		chart.tooltip({
			showTitle: false,
			showMarkers: false,
			shared: true,
		});

		chart.scale({
			longitude: {
				sync: true
			},
			latitude: {
				sync: true
			}
		});
		chart.axis(false);
		chart.legend('trend', {
			position: 'bottom'
		});

		// 绘制世界地图背景
		const ds = new DataSet();
		const worldMap = ds.createView('back')
			.source(IndiaJson, {
				type: 'GeoJSON'
			});
		const worldMapView = chart.createView();
		worldMapView.data(worldMap.rows);
		worldMapView.tooltip(false);
		worldMapView.polygon().position('longitude*latitude').style({
			fill: '#fff',
			stroke: '#ccc',
			lineWidth: 1
		});

		const userDv = ds.createView()
			.source(cases)
			.transform({
				geoDataView: worldMap,
				field: 'id',
				type: 'geo.region',
				as: ['longitude', 'latitude']
			})
			.transform({
				type: 'map',
				callback: obj => {
					obj.trend = getTrendValue(obj.value); // (obj.value > 1000) ? 'high' : 'low';
					return obj;
				}
			});
		const userView = chart.createView();
		userView.data(userDv.rows);
		userView.scale({
			trend: {
				alias: 'cases'
			}
		});
		userView.polygon()
			.position('longitude*latitude')
			.color('trend', val => {
				return getTrendColor(val);
			})
			.tooltip('id*trend')
			.style({
				fillOpacity: 0.85
			});
		chart.render();
	}, [cases]);
	return (
		<>
			<div ref={container} />
		</>
	);
});

export default IndiaMap;
