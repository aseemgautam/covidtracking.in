import { Statistic, Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const TrendStatistic = ({ statistic }) => {
	const icon = statistic.primary > 0 ? <ArrowUpOutlined className="red" />
		: <ArrowDownOutlined className="green" />;
	const helpText = (
		<Tooltip title={statistic.helpText}>
			<QuestionCircleOutlined />
		</Tooltip>
	);
	return (
		<Statistic
			className="covid-statistic"
			title={(
				<>
					<span>{statistic.name}</span>
					{statistic.helpText && helpText}
				</>
			)}
			value={statistic.primary}
			precision={0}
			prefix={icon}
		/>
	);
};

export default TrendStatistic;
