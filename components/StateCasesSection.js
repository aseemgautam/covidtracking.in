import { Row, Col } from 'antd';
import Statewise from './Statewise';
import Analytics from '../classes/Analytics';

function ActiveCasesSection() {
	return (
		<>
			<Row>
				<Col flex={24} className="page-section-title">
					<h4>STATE STATISTICS</h4>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} sm={24} md={24}>
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
