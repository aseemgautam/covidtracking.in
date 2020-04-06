import React from 'react';
import App from 'next/app';
import SiteLayout from '../components/Layout';
import 'antd/es/grid/style/index.css';
import 'antd/es/style/index.css';
import 'antd/es/statistic/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/space/style/index.css';
import 'antd/es/typography/style/index.css';
import 'antd/es/list/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/icon/style/index.css';
// import 'antd/dist/antd.css';
import '../css/style.css';
import '../css/statistics.scss';
import '../css/vars.scss';

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
