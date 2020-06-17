/* eslint-disable max-len */
import L from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';

class LeafletMap {
	constructor(lat, lng, zoom, getColor, getInfo, geoJSON) {
		L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
		this.map = L.map('map',
			{ zoomControl: false, gestureHandling: true })
			.setView([lat, lng], zoom);
		this.map.touchZoom.disable();
		this.map.boxZoom.disable();
		this.map.doubleClickZoom.disable();
		this.map.scrollWheelZoom.disable();
		// this.map.dragging.disable();
		// this.map.tap = false;
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNlZW1nYXV0YW0iLCJhIjoiY2s5NG1hdW9uMGFtaTNmbnlodzE5MG1ydCJ9.bI9pFdktrGpRkNEMhiyKkg',
			{
				id: 'mapbox/light-v9',
				minZoom: 0,
				maxZoom: 10
			}
		).addTo(this.map);
		this.infoCtrl = L.control();

		this.infoCtrl.onAdd = () => {
			this.infoDiv = L.DomUtil.create('div', 'map-info');
			this.infoCtrl.update();
			return this.infoDiv;
		};

		// method that we will use to update the control based on feature properties passed
		this.infoCtrl.update = props => {
			this.infoDiv.innerHTML = `${props
				? `<h4>${props.name}</h4>${this.getInfo(props.name)}`
				: 'Hover/Tap on any state'}`;
		};
		this.infoCtrl.addTo(this.map);

		this.getColor = getColor;
		this.getInfo = getInfo;
		this.geoJsonLayer = L.geoJson(geoJSON, { style: this.style,
			onEachFeature: this.onEachFeature }).addTo(this.map);
	}

	resetGeoJsonStyle = () => {
		this.geoJsonLayer.resetStyle();
	}

	style = feature => {
		return {
			fillColor: this.getColor(feature.properties.name),
			weight: 1,
			opacity: 1,
			color: 'white',
			dashArray: '0',
			fillOpacity: 1
		};
	}

	highlightFeature = e => {
		const layer = e.target;

		layer.setStyle({
			weight: 1,
			color: '#444',
			dashArray: '',
			fillOpacity: 1
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
		this.infoCtrl.update(layer.feature.properties);
	}

	resetHighlight = e => {
		if (this.geoJsonLayer) this.geoJsonLayer.resetStyle(e.target);
	}

	onEachFeature = (feature, layer) => {
		layer.on({
			mouseover: this.highlightFeature,
			mouseout: this.resetHighlight,
			click: e => { this.geoJsonLayer.resetStyle(); this.highlightFeature(e); }
		});
	}
}

export default LeafletMap;
