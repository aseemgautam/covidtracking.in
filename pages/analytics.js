import FullWidthRow from '../components/layout/FullWidthRow';
import NewCasesChart from '../components/charts/NewCasesChart';
import TestingChart from '../components/charts/Testing';
import ActiveCasesSection from '../components/ActiveCasesSection';
import Analytics from '../classes/Analytics';

const analytics = () => {
	return (
		<>
			<FullWidthRow>
				<h2 className="featured">
					Explore graphics along with tips to help you
					present the data in the clearest and most accurate way possible.
				</h2>
				<h3 className="title">NEW / ACTIVE CASES, DEATHS & RECOVERED</h3>
				<NewCasesChart cases={Analytics.cases} />
			</FullWidthRow>
			<FullWidthRow>
				<h3 className="title">COVID-19 TESTING</h3>
				<TestingChart />
			</FullWidthRow>
			<FullWidthRow>
				<ActiveCasesSection />
			</FullWidthRow>
		</>
	);
};

export default analytics;
