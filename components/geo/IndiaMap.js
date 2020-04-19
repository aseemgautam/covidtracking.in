/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import IndiaGeoJSON from '../../public/india';
import LeafletMap from '../LeafletMap';

const Map = React.memo(({ statewiseLatest }) => {
	useEffect(() => {
		function getColor(name) {
			const item = statewiseLatest.find(state => { return state.state === name; });
			return item ? item.color : '#000';
		}
		function getInfo(name) {
			const item = statewiseLatest.find(state => { return state.state === name; });
			return item.confirmed;
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
