/* eslint-disable no-restricted-syntax */
import NationWide from '../components/Nationwide';
import Charts from '../components/Charts';
import Analytics from '../classes/Analytics';

const Index = ({ statewiseLatest, newCases }) => {
	return (
		<>
			<NationWide />
			<Charts statewiseLatest={statewiseLatest} newCases={newCases} />
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {
			statewiseLatest: Analytics.statewiseLatest(),
			newCases: Analytics.cases.slice(-31)
		}
	};
}


export default Index;
