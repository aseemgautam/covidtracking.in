import { Tabs, Tag, Row, Col } from 'antd';
import _ from 'lodash';
import NationalStats from './NationalStats';
import DailyReportSection from './DailyReportSection';
import NewCasesAndDeathsChart from './chartsv2/NewCasesAndDeathsChart';
import TestAndPositivityChart from './chartsv2/TestAndPositivityChart';

const { TabPane } = Tabs;

const HomePageTabs = ({ testingData, indiaData, stateDataLatest, buildTime }) => {
	let liveCounter = 0; let cases = 0; let recovered = 0; let deaths = 0; let active = 0; let tests = 0;
	let positivity = 0;
	for (let i = 0; i < stateDataLatest.length; i++) {
		cases += stateDataLatest[i].newCases;
		recovered += stateDataLatest[i].newRecover;
		deaths += stateDataLatest[i].newDeaths;
		tests += stateDataLatest[i].newTests;
		if (stateDataLatest[i].newCases > 0 || stateDataLatest[i].newRecovered > 0) {
			liveCounter += 1;
		}
	}
	active = cases - recovered - deaths;
	const recoveryRate = ((recovered * 100) / cases).toFixed(2);
	const deathRate = ((deaths * 100) / (deaths + recovered)).toFixed(2);
	positivity = tests > 0 ? ((cases * 100) / tests).toFixed(2) : '-';
	let tabExtraContent = <span />;

	if (typeof window !== 'undefined') {
		tabExtraContent = <div style={{ marginTop: '4px' }}>{buildTime}</div>;
	}

	return (
		<Tabs tabBarExtraContent={tabExtraContent}>
			<TabPane
				tab={
					(<div>National Statistics</div>)
				}
				key="1"
			>
				<NationalStats
					testingData={testingData}
					covidDataIndia={indiaData}
					cases={cases}
					recovered={recovered}
					deaths={deaths}
					active={active}
					tests={tests}
					positivity={positivity}
					recoveryRate={recoveryRate}
					deathRate={deathRate}
				/>
			</TabPane>
			<TabPane
				tab={
					(<div>Graphs</div>)
				}
				key="2"
			>
				<Row gutter={[24, 16]}>
					<Col xs={24} md={12}>
						<div className="flex-row-spread chart-title">
							<h4>New Cases & Deaths</h4>
						</div>
						<NewCasesAndDeathsChart
							newCases={_.map(indiaData.cases, 'newCases')}
							dates={_.map(indiaData.cases, 'date')}
							movingAverage={_.map(indiaData.cases, 'movingAvg7days')}
							deaths={_.map(indiaData.cases, 'newDeaths')}
						/>
					</Col>
					<Col xs={24} sm={12}>
						<div className="flex-row-spread chart-title">
							<h4>Daily Tests & Positivity (+VE) Rate</h4>
						</div>
						<TestAndPositivityChart
							tests={_.map(testingData, 'newSamples')}
							dates={_.map(testingData, 'date')}
							movingAverage={_.map(testingData, 'New Samples 7 Day MA')}
							positivity={_.map(testingData, 'percentPositive')}
							positivityMovingAverage={_.map(testingData, '+ve Rate 7 Day MA')}
						/>
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(
						<div>+Today &nbsp;
							<Tag className="live-counter" style={{ color: '#303030' }} color="#FFD666">
								{liveCounter}
							</Tag>
						</div>
					)
				}
				key="3"
			>
				<DailyReportSection casesByStateLatest={stateDataLatest} />
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabs;
