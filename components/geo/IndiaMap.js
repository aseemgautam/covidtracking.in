import React, { useEffect, useRef } from 'react';
import IndiaGeoJSON from '../../public/IndiaGeo.json';
import LeafletMap from './LeafletMap';
import Colors from '../../classes/Colors';
import CovidDataStateWise from '../../classes/CovidDataStateWise';

const Map = React.memo(() => {
	const map = useRef(null);
	function getColor(name) {
		const latest = CovidDataStateWise.getLatest(name);
		return Colors.getTrendColor(latest ? latest.movingAvg14daysRate : 0);
	}
	function getInfo(name) {
		const rate = CovidDataStateWise.getLatest(name).movingAvg14daysRate;
		if (rate > 0) {
			return `New cases have increased by ${rate}% over the last 14 days`;
		}
		return `New cases have decreased by ${rate}% over the last 14 days`;
	}

	useEffect(() => {
		map.current = new LeafletMap(23.59, 82, 4, getColor, getInfo, IndiaGeoJSON);
	}, []);
	return (
		<>
			<div id="map" />
		</>
	);
});

export default Map;
