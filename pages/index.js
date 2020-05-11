/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import Head from 'next/head';
import Statistics from '../components/Statistics';
import StateCasesSection from '../components/StateCasesSection';

function Index() {
	return (
		<>
			<Head>
				<title>Covid-19 Insights & Analytics - India</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta property="og:title" content="Understandable insights on covid-19 in India" key="title" />
				<meta property="og:description" content="Data driven insights & reports on spread of covid-19 in India." key="description" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://covid19wiki.now.sh/" />
				<meta property="og:image" content="/cvd-og.png" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Statistics />
			<StateCasesSection />
		</>
	);
}

export default Index;
