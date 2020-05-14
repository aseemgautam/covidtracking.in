/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../lib/gtag';

export default class extends Document {
	render() {
		return (
			// eslint-disable-next-line jsx-a11y/html-has-lang
			<html>
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" />
					<meta property="og:title" content="Understandable insights on covid-19 in India" key="title" />
					<meta property="og:description" content="Data driven insights & reports on spread of covid-19 in India." key="description" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://covid19wiki.now.sh/" />
					<meta property="og:image" content="/cvd-og.png" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					{/* Global Site Tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});
					`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
