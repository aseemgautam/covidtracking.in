import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import FullWidthRow from './layout/FullWidthRow';
import CalenderActiveGrowth from './charts/CalenderActiveGrowth';
import Analytics from '../classes/Analytics';

const IndiaMap = dynamic(() => { return import('./geo/IndiaMap'); }, { ssr: false });

const Charts = () => {
	return (
		<>
			<FullWidthRow>
				<CalenderActiveGrowth cases={Analytics.casesForCalendarActiveGrowth} />
			</FullWidthRow>
			{/* <FullWidthRow>
				<NewCasesChart cases={Analytics.cases.slice(-14)} />
			</FullWidthRow>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={24}>
					<div className="section">
						<StateGrowth />
					</div>
				</Col>
			</Row> */}
			{/* <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={12}>
					<div className="section">
						<GenderRatio />
					</div>
				</Col>
				<Col xs={24} md={12}>
					<div className="section">
						<AgeDemographics />
					</div>
				</Col>
			</Row> */}
			{/* <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={24} md={24}>
					<div className="section">
						<Testing />
					</div>
				</Col>
			</Row> */}
		</>
	);
};

export default Charts;
