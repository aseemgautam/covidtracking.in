import { Typography, Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import { BarChartOutlined } from '@ant-design/icons';
import Statewise from './Statewise';
import Analytics from '../classes/Analytics';

// const { Text } = Typography;
const IndiaMap = dynamic(() => { return import('./geo/IndiaMap'); }, { ssr: false });

function ActiveCasesSection() {
	return (
		<>
			{/* <div className="section-head">
				<h4><BarChartOutlined /> STATE & DISTRICT CASES </h4>
			</div> */}
			{/* <div className="section-content">
				<Text type="secondary">
					Daily growth of covid-19 cases for the selected period.
				</Text>
			</div> */}
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={12}>
					<IndiaMap statewiseLatest={Analytics.casesByStateLatest} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<div className="section">
						<Statewise
							casesByStateLatest={Analytics.casesByStateLatest}
							districts={Analytics.districts}
						/>
					</div>
				</Col>
			</Row>
		</>
	);
}

export default ActiveCasesSection;
