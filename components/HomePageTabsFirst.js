import { Tabs, Tag } from 'antd';
import StateDeltaGrid from './StateDeltaGrid';
import NationalStats from './NationalStats';

const { TabPane } = Tabs;

const HomePageTabs = ({ testingData, indiaData, stateDataLatest, buildTime }) => {
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
			(
				<div>{buildTime}</div>
			)
		}
		>
			<TabPane
				tab={
					(<div>National Statistics</div>)
				}
				key="1"
			>
				{/* <div className="stats-explainer">National Statistics are as per MOHFW numbers in the morning.
					+TODAY data is from daily evening state bulletins.
				</div> */}
				<NationalStats testingData={testingData} covidDataIndia={indiaData} />
			</TabPane>
			<TabPane
				tab={
					(
						<div>+Today <Tag color="gold">{liveCounter}</Tag></div>
					)
				}
				key="2"
			>
				<StateDeltaGrid casesByStateLatest={stateDataLatest} />
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabs;
