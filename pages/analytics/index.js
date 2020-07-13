import { Row, Col } from 'antd';
import FullWidthRow from '../../components/layout/FullWidthRow';

const Index = () => {
	return (
		<>
			<FullWidthRow>
				<h2 className="featured">
					Explore graphics along with tips to help you
					present the data in the clearest and most accurate way possible.
				</h2>
			</FullWidthRow>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={12} md={8}>
					<div className="analytics-name">
						<h3><a href="analytics/cases-per-million">Cases Per Million/Capita</a></h3>
					</div>
				</Col>
				<Col className="analytics-card" xs={12} sm={12} md={8}>
					<div className="analytics-name">
						<h3><a href="analytics/far-from-peak">How far is India from Peak?</a></h3>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Index;
