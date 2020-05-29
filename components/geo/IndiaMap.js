import React, { useEffect, useRef } from 'react';
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
	useEffect(() => {
		map.current = new LeafletMap(23.59, 82, 4, getColor, getInfo, IndiaGeoJSON);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statewiseLatest]);
	return (
		<>
			<div id="map" />
		</>
	);
});

export default Map;
