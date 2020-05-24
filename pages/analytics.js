import { Divider } from 'antd';
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
					Explore graphics made with the COVID Tracking Project dataset along with tips to help you
					present the data in the clearest and most accurate way possible.
				</h2>
				{/* <Divider /> */}
				<h3 className="title">GROWTH IN NEW & ACTIVE CASES</h3>
				<NewCasesChart cases={Analytics.cases} />
			</FullWidthRow>
			<FullWidthRow>
				{/* <Divider /> */}
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
