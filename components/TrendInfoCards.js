import { Row, Col } from 'antd';
import Colors from '../classes/Colors';

const TrendColumn = props => {
	const { backgroundColor, name, title, description } = props;
	return (
		<>
			<Col xs={12}>
				<div className="trend-info" style={{ backgroundColor }}>
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
					backgroundColor={Colors.getTrendColor(75)}
					name="RED"
					title="Rapid Growth in New Cases"
					description="NEW covid+ cases (daily, average) have increased by 50% or more in the last 14 days."
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(45)}
					name="ORANGE"
					title="Moderate growth in New Cases"
					description="NEW covid+ cases (daily, average) have INCREASED 20% - 50% in last 14 days."
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(15)}
					name="YELLOW"
					title="Low Growth in New Cases"
					description="NEW covid+ cases (daily, average) have INCREASED 0 - 20% in last 14 days."
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(-5)}
					name="GREEN"
					title="Negative Growth in New Cases"
					description="NEW covid+ cases (daily, average) have gone DOWN in last 14 days."
				/>
			</Row>
		</>
	);
};

export default TrendInfoCards;
