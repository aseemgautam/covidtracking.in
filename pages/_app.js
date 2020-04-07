/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import SiteLayout from '../components/Layout';
import 'antd/es/grid/style/index.css';
import 'antd/es/card/style/index.css';
import 'antd/es/style/index.css';
import 'antd/es/statistic/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/space/style/index.css';
import 'antd/es/typography/style/index.css';
import 'antd/es/list/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/tag/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/breadcrumb/style/index.css';
import '../css/style.scss';
import '../css/statistics.scss';
import '../css/vars.scss';
import '../css/lab.scss';

class Covid19Wiki extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<SiteLayout>
				<Component {...pageProps} />
			</SiteLayout>
		);
	}
}

export default Covid19Wiki;
