import { Tabs, Tag, Row, Col } from 'antd';
import _ from 'lodash';
import NationalStats from './NationalStats';
import DailyReportSection from './DailyReportSection';
import NewCasesAndDeathsChart from './chartsv2/NewCasesAndDeathsChart';
import TestAndPositivityChart from './chartsv2/TestAndPositivityChart';

const { TabPane } = Tabs;

const HomePageTabs = ({ indiaDailyStats, latest, stateDataLatest, buildTime }) => {
	let tabExtraContent = <span />;
	if (typeof window !== 'undefined' && window.innerWidth > 576) {
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
					dailyStatistics={indiaDailyStats}
					latest={latest}
					isNational
				/>
				<p>
					Today&apos;s statistics are from end of day state bulletins published between 6:00 PM - midnight.
					Yesterday & other date statistics are confirmed national numbers by MOHFW.
				</p>
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
							newCases={_.map(indiaDailyStats, 'newCases')}
							dates={_.map(indiaDailyStats, 'date')}
							movingAverage={_.map(indiaDailyStats, 'movingAvg7days')}
							deaths={_.map(indiaDailyStats, 'newDeaths')}
							deathsMovingAverage={_.map(indiaDailyStats, 'newDeaths7DayMA')}
						/>
					</Col>
					<Col xs={24} sm={12}>
						<div className="flex-row-spread chart-title">
							<h4>Daily Tests & Positivity</h4>
						</div>
						<TestAndPositivityChart
							tests={_.map(indiaDailyStats, 'newTests')}
							dates={_.map(indiaDailyStats, 'date')}
							movingAverage={_.map(indiaDailyStats, 'newTests7DayMA')}
							positivity={_.map(indiaDailyStats, 'dailyPositivity')}
							positivityMovingAverage={_.map(indiaDailyStats, 'dailyPositivity7DayMA')}
						/>
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(
						<div>+Today &nbsp;
							<Tag className="live-counter" style={{ color: '#303030' }} color="#FFD666">
								{latest.count}
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
