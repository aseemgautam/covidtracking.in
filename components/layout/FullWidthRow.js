import { Row, Col } from 'antd';

const FullWidthRow = props => {
	const { children, className } = props;
	return (
		<Row>
			<Col xs={24} md={24}>
				<div className={className}>
					{children}
				</div>
			</Col>
		</Row>
	);
};

export default FullWidthRow;
