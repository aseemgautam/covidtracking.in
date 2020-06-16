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
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content="How is India doing - covidtracking.in" />
					<meta name="twitter:description" content="Tracking COVID-19 in India using scientific criteria developed by CDC, USA" />
					<meta name="twitter:site" content="@CovidTrackingIn" />
					<meta name="twitter:creator" content="@CovidTrackingIn" />
					<meta name="twitter:image" content="/twitter-card.png" />
					<meta property="og:title" content="How is India doing - covidtracking.in" key="title" />
					<meta property="og:description" content="Tracking COVID-19 using scientific criteria developed by CDC, USA" key="description" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://covidtracking.in" />
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
