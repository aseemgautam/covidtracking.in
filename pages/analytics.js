import FullWidthRow from '../components/layout/FullWidthRow';
// import NewCasesChart from '../components/charts/NewCasesChart';
// import TestingChart from '../components/charts/Testing';
// import ActiveCasesSection from '../components/ActiveCasesSection';
// import Analytics from '../classes/Analytics';
// import CovidDataIndia from '../classes/CovidDataIndia';

const analytics = () => {
	return (
		<>
			<FullWidthRow>
				<h2 className="featured">
					Explore graphics along with tips to help you
					present the data in the clearest and most accurate way possible.
				</h2>
				<h3 className="title">NEW / ACTIVE CASES, DEATHS & RECOVERED</h3>
				{/* <NewCasesChart cases={Analytics.cases} /> */}
			</FullWidthRow>
			{/* <FullWidthRow>
				<h3 className="title">COVID-19 TESTING</h3>
				<TestingChart testingData={testingData} />
			</FullWidthRow>
			<FullWidthRow>
				<ActiveCasesSection />
			</FullWidthRow> */}
		</>
	);
};

// export async function getStaticProps() {
// 	const data = await CovidDataIndia.fetchTests();
// 	const testingData = [];
// 	data.forEach(test => {
// 		testingData.push(
// 			{ date: test.date, type: 'Samples', value: test.newSamples },
// 			{ date: test.date,
// 				type: 'Positive',
// 				value: test.newPositive,
// 				percent: Math.round((test.percentPositive + Number.EPSILON) * 100) / 100
// 			}
// 		);
// 	});
// 	return {
// 		props: { testingData }, // will be passed to the page component as props
// 	};
// }

export default analytics;
