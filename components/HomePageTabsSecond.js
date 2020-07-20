import { Tabs, Row, Col } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import TrendInfoCards from './TrendInfoCards';
import StateTable from './StateTable';
import StateStatsTable from './StateStatsTable';

const IndiaMap = dynamic(() => { return import('./geo/IndiaMap'); }, { ssr: false });
const { TabPane } = Tabs;

const HomePageTabsSecond = ({ stateDataLatest }) => {
	return (
		<Tabs>
			<TabPane
				tab={
					(<div className="card-tab-title">India Map</div>)
				}
				key="1"
			>
				<Row>
					<Col flex={24}>
						<p>Scales are based on value of <b>7 day Moving Average</b> of new cases over 14 days.
							Read more about our criteria <a href="/criteria">here</a>.
						</p>
					</Col>
				</Row>
				<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
					<Col xs={24} sm={24} md={12}>
						<IndiaMap stateDataMostRecent={stateDataLatest} />
					</Col>
					<Col xs={24} sm={24} md={12}>
						<TrendInfoCards colSpan={12} />
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(<div className="card-tab-title">7 & 14 Day Averages <LineChartOutlined /></div>)
				}
				key="2"
			>
				<Row>
					<Col xs={24} sm={24} md={24}>
						<StateTable
							casesByStateLatest={stateDataLatest}
						/>
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(<div className="card-tab-title">Stats</div>)
				}
				key="3"
			>
				<Row>
					<Col xs={24} sm={24} md={24}>
						<StateStatsTable
							casesByStateLatest={stateDataLatest}
						/>
					</Col>
				</Row>
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabsSecond;
