import { Row, Col } from 'antd';

const FullWidthRow = props => {
	const { children } = props;
	return (
		<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
			<Col xs={24} md={24}>
				<div className="section">
					{children}
				</div>
			</Col>
		</Row>
	);
};

export default FullWidthRow;
