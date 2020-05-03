import React, { useEffect, useRef } from 'react';
import { Radio } from 'antd';
import IndiaGeoJSON from '../../public/india';
import LeafletMap from './LeafletMap';
import Analytics from '../../classes/Analytics';

const Map = React.memo(({ statewiseLatest }) => {
	const colorMetric = useRef('active');
	const map = useRef(null);
	function getColor(name) {
		const item = statewiseLatest.find(state => { return state.state === name; });
		return Analytics.getMapColor(item ? item[colorMetric.current] : 0);
	}
	function getInfo(name) {
		const item = statewiseLatest.find(state => { return state.state === name; });
		return item ? item.confirmed : 0;
	}
	function onMetricChange(e) {
		colorMetric.current = e.target.value;
		map.current.resetGeoJsonStyle();
	}
	useEffect(() => {
		map.current = new LeafletMap(23.59, 82, 4, getColor, getInfo, IndiaGeoJSON);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statewiseLatest]);
	return (
		<>
			<Radio.Group onChange={onMetricChange} defaultValue={colorMetric.current}>
				<Radio.Button value="confirmed">Confirmed</Radio.Button>
				<Radio.Button value="active">Active Cases</Radio.Button>
				<Radio.Button value="2">Confirmed / 1L</Radio.Button>
			</Radio.Group>
			<br /><br />
			<div id="map" />
		</>
	);
});

export default Map;
