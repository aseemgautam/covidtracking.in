import FullWidthRow from '../components/layout/FullWidthRow';
import ActiveCasesSection from '../components/ActiveCasesSection';
import NewCasesSection from '../components/NewCasesSection';
import TestingSection from '../components/TestingSection';

const analytics = () => {
	return (
		<>
			<FullWidthRow>
				<NewCasesSection />
			</FullWidthRow>
			<FullWidthRow>
				<TestingSection />
			</FullWidthRow>
			<FullWidthRow>
				<ActiveCasesSection />
			</FullWidthRow>
		</>
	);
};

export default analytics;
