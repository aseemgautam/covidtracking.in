import Head from 'next/head';
// eslint-disable-next-line import/no-unresolved
import DWChart from 'react-datawrapper-chart';

const Testing = () => {
	return (
		<>
			{/* <Breadcrumb>
				<Breadcrumb.Item>
					<a href="/">Home</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Coronavirus India - Testing across states</Breadcrumb.Item>
			</Breadcrumb>
			<br /> */}
			<Head>
				<title>Coronavirus Testing across India</title>
			</Head>
			<DWChart title="Chart" src="//datawrapper.dwcdn.net/FIsKB/9/" />
		</>
	);
};

export default Testing;
