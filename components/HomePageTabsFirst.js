import { Tabs, Badge } from 'antd';
import StatePlusGrid from './StateDeltaGrid';
import NationalStats from './NationalStats';

const { TabPane } = Tabs;

const HomePageTabs = ({ testingData, indiaData, stateDataLatest }) => {
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
			(<div>11th July, 20:08 PM</div>)
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
						<Badge count={liveCounter} offset={[20, 18]}>
							<div className="card-tab-title">+States</div>
						</Badge>
					)
				}
				key="2"
			>
				<StatePlusGrid casesByStateLatest={stateDataLatest} />
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabs;
