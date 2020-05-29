import { Row, Col } from 'antd';

const TrendColumn = props => {
	const { className, name, title, description } = props;
	return (
		<>
			<Col xs={12}>
				<div className={`trend-info ${className}`}>
					<div>{name}</div>
					<div>{title}</div>
				</div>
			</Col>
			<Col span={12}>
				<div className="trend-info description">
					{description}
				</div>
			</Col>
		</>
	);
};

const TrendInfoCards = () => {
	return (
		<>
			<Row
				gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}
				justify="center"
				align="middle"
			>
				<TrendColumn
					className="very-poor"
					name="RED"
					title="Trending Very Poorly"
					description="If cases are increasing (more than 5% change) during the 14 day period."
				/>
				<TrendColumn
					className="poor"
					name="ORANGE"
					title="Getting Worse"
					description="If cases are increasing (more than 5% change) during the 14 day period."
				/>
				<TrendColumn
					className="progress"
					name="YELLOW"
					title="Making Progress"
					description="If cases are increasing (more than 5% change) during the 14 day period."
				/>
				<TrendColumn
					className="better"
					name="GREEN"
					title="Trending Better"
					description="If cases are increasing (more than 5% change) during the 14 day period."
				/>
			</Row>
		</>
	);
};

export default TrendInfoCards;
