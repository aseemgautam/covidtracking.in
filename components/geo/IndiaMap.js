import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import IndiaGeoJSON from '../../public/IndiaGeo.json';
import LeafletMap from './LeafletMap';
import Colors from '../../classes/Colors';

const Map = React.memo(({ stateDataMostRecent }) => {
	const map = useRef(null);
	function getColor(name) {
		const latest = _.filter(stateDataMostRecent, { state: name });
		if (latest[0]) {
			return Colors.getTrendColor(latest[0].movingAvg14daysRate, latest[0].newCases14days);
		}
		return Colors.getTrendColor(0, 0);
	}
	function getInfo(name) {
		const latest = _.filter(stateDataMostRecent, { state: name });
		const rate = latest[0] ? latest[0].movingAvg14daysRate : 0;
		if (rate > 0) {
			return `New cases have increased by ${rate}% over the last 14 days`;
		}
		return `New cases have decreased by ${Math.abs(rate)}% over the last 14 days`;
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
