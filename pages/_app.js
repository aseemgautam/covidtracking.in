import React from 'react';
import App from 'next/app';
import SiteLayout from '../components/Layout';
import '../css/style.css';
import '../css/statistics.css';

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
