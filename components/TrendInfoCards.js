import { Row, Col } from 'antd';
import Colors from '../classes/Colors';

const TrendColumn = props => {
	const { backgroundColor, name, title, description, colSpan } = props;
	return (
		<>
			<Col xs={colSpan}>
				<div className="trend-info" style={{ backgroundColor }}>
					<div>{name}</div>
					<div>{title}</div>
				</div>
			</Col>
			<Col xs={colSpan}>
				<div className="trend-info description">
					{description}
				</div>
			</Col>
		</>
	);
};

const TrendInfoCards = ({ colSpan }) => {
	return (
		<>
			<Row
				gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}
				justify="center"
				align="middle"
			>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(75, 125)}
					name="RED"
					title="Rapid Growth in New Cases"
					description="14 DAY TREND > 50%. Atleast 100 new covid+ cases."
					colSpan={colSpan}
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(45, 75)}
					name="ORANGE"
					title="Moderate growth in New Cases"
					description="20% < 14 DAY TREND < 50%. Atleast 50 new covid+ cases."
					colSpan={colSpan}
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(15, 30)}
					name="YELLOW"
					title="Low Growth in New Cases"
					description="0% < 14 DAY TREND < 20%. Atleast 25 new covid+ cases."
					colSpan={colSpan}
				/>
				<TrendColumn
					backgroundColor={Colors.getTrendColor(-5, 10)}
					name="GREEN"
					title="Negative Growth in New Cases"
					description="14 DAY TREND < 0%. New covid+ cases have gone down."
					colSpan={colSpan}
				/>
			</Row>
		</>
	);
};

export default TrendInfoCards;
