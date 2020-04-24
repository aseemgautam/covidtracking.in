/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import IndiaGeoJSON from '../../public/india';
import LeafletMap from '../LeafletMap';
import Analytics from '../../classes/Analytics';

const Map = React.memo(({ statewiseLatest }) => {
	useEffect(() => {
		function getColor(name) {
			const item = statewiseLatest.find(state => { return state.state === name; });
			return Analytics.getMapColor(item ? item.confirmed : 0);
		}
		function getInfo(name) {
			const item = statewiseLatest.find(state => { return state.state === name; });
			return item ? item.confirmed : 0;
		}
		const lmap = new LeafletMap(23.59, 81, 4, getColor, getInfo, IndiaGeoJSON);
	}, [statewiseLatest]);
	return (
		<>
			<div id="map" />
		</>
	);
});

export default Map;
