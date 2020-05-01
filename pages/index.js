/* eslint-disable no-restricted-syntax */
import Statistics from '../components/Statistics';
import FullWidthRow from '../components/layout/FullWidthRow';
import ActiveCasesSection from '../components/ActiveCasesSection';
import NewCasesSection from '../components/NewCasesSection';
import StateCasesSection from '../components/StateCasesSection'

function Index() {
	return (
		<>
			<Statistics />
			<StateCasesSection />
			{/* <FullWidthRow>
				<ActiveCasesSection />
			</FullWidthRow>
			<FullWidthRow>
				<NewCasesSection />
			</FullWidthRow> */}
		</>
	);
}

export default Index;
