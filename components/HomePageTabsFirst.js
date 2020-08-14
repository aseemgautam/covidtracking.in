import { Tabs, Tag } from 'antd';
import StateDeltaGrid from './StateDeltaGrid';
import NationalStats from './NationalStats';

const { TabPane } = Tabs;

const HomePageTabs = ({ testingData, indiaData, stateDataLatest, buildTime }) => {
	let liveCounter = 0; let cases = 0; let recovered = 0; let deaths = 0; let active = 0;
	for (let i = 0; i < stateDataLatest.length; i++) {
		cases += stateDataLatest[i].newCases;
		recovered += stateDataLatest[i].newRecover;
		deaths += stateDataLatest[i].newDeaths;
		if (stateDataLatest[i].newCases > 0 || stateDataLatest[i].newRecovered > 0) {
			liveCounter += 1;
		}
	}
	active = cases - recovered - deaths;
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
				<NationalStats
					testingData={testingData}
					covidDataIndia={indiaData}
					cases={cases}
					recovered={recovered}
					deaths={deaths}
					active={active}
				/>
			</TabPane>
			<TabPane
				tab={
					(
						<div>+Today &nbsp;<Tag color="geekblue">{liveCounter}</Tag></div>
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
