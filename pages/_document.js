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
					<link rel="shortcut icon" href="/favicon.png" />
					<meta property="og:title" content="COVID-19 Tracking India" key="title" />
					<meta property="og:description" content="Tracking COVID-19 using scientific criteria defined by CDC, USA" key="description" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://covidtracking.in/" />
					<meta property="og:image" content="/og-img.png" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
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
