import { Statistic, Tooltip } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const CovidStatistic = ({ statistic, className, suffixClassName, precision }) => {
	const showPlusIcon = statistic.secondary && Number.isInteger(statistic.secondary)
		&& statistic.secondary > 0;
	const helpText = (
		<Tooltip title={statistic.helpText}>
			<QuestionCircleOutlined />
		</Tooltip>
	);
	return (
		<Statistic
			className={`${className} covid-statistic`}
			title={(
				<>
					<span>{statistic.name}</span>
					{statistic.helpText && helpText}
				</>
			)}
			value={statistic.primary}
			precision={precision}
			suffix={(
				<>
					{showPlusIcon && <PlusOutlined className={suffixClassName} />}
					<span className={suffixClassName}>{statistic.secondary}</span>
				</>
			)}
		/>
	);
};

const CovidStatisticFactory =	(statistic, className, suffixClassName, precision) => {
	return (
		<CovidStatistic
			className={className}
			statistic={statistic}
			suffixClassName={suffixClassName}
			precision={precision}
		/>
	);
};

export { CovidStatisticFactory };
export default CovidStatistic;
