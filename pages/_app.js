/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import SiteLayout from '../components/Layout';
import 'antd/es/grid/style/index.css';
import 'antd/es/style/index.css';
import 'antd/es/statistic/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/list/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/tabs/style/index.css';
import 'antd/es/progress/style/index.css';
import 'antd/es/breadcrumb/style/index.css';
import 'antd/es/dropdown/style/index.css';
import 'antd/es/tooltip/style/index.css';
import 'antd/es/tag/style/index.css';
import 'antd/es/menu/style/index.css';
import 'antd/es/card/style/index.css';
import 'antd/es/table/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import '../css/style.scss';
import '../css/fontSize.scss';
import '../css/statistics.scss';
import '../css/vars.scss';
import '../css/stateTable.scss';
import '../css/charts.scss';
import '../css/home.scss';
import '../css/antd-rules.scss';
import '../css/trends.scss';
import '../css/navigation.scss';
import '../css/layout.scss';
import '../css/about.scss';
import '../css/cardGrid.scss';
import '../css/analytics.scss';
import '../css/dailyReport.scss';

Router.events.on('routeChangeStart', () => {
	document.getElementById('loading').style.display = 'block';
});
Router.events.on('routeChangeComplete', () => {
	document.getElementById('loading').style.display = 'none';
});
Router.events.on('routeChangeError', () => {
	document.getElementById('loading').style.display = 'none';
});

class CovidTracking extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<SiteLayout>
				<div id="loading"><LoadingOutlined /></div>
				<Component {...pageProps} />
			</SiteLayout>
		);
	}
}

export default CovidTracking;
