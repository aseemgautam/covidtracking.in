import { Tabs, Badge } from 'antd';
import LiveUpdate from './LiveUpdate';
import NationalStats from './NationalStats';

const { TabPane } = Tabs;

const HomeLiveTabs = ({ testingData, indiaData, stateDataLatest }) => {
	const liveCounter = stateDataLatest.reduce(
		(acc, state) => {
			if (state.newCases > 0 || state.newRecovered > 0) {
				acc += 1;
			}
			return acc;
		}, 0
	);
	return (
		<Tabs tabBarExtraContent={
			(<div>7th July, 10:41 AM</div>)
		}
		>
			<TabPane
				tab={
					(<div className="card-tab-title">National Statistics</div>)
				}
				key="1"
			>
				<NationalStats testingData={testingData} covidDataIndia={indiaData} />
			</TabPane>
			<TabPane
				tab={
					(
						<Badge count={0} offset={[20, 18]}>
							<div className="card-tab-title">+States</div>
						</Badge>
					)
				}
				key="2"
			>
				<LiveUpdate casesByStateLatest={stateDataLatest} />
			</TabPane>
		</Tabs>
	);
};

export default HomeLiveTabs;
