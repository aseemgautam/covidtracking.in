/* eslint-disable no-restricted-syntax */
import NationWide from '../components/Nationwide';
import Charts from '../components/Charts';
import Analytics from '../classes/Analytics';

function Index({ statewiseLatest, newCases }) {
	return (
		<>
			<NationWide />
			<Charts statewiseLatest={statewiseLatest} newCases={newCases} />
		</>
	);
}

export default Index;

export async function getStaticProps() {
	return {
		props: {
			statewiseLatest: Analytics.casesByStateLatest,
			newCases: Analytics.cases.slice(-14)
		}
	};
}
