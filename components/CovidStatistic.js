import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CovidStatistic = ({ className, title, precision, value,
	suffixValue, suffixClassName, showPlusIcon }) => {
	return (
		<Statistic
			className={`${className} covid-statistic-with-suffix`}
			title={(
				<>
					<span>{title}</span>
				</>
			)}
			value={value}
			precision={precision}
			suffix={(
				<>
					{showPlusIcon && <PlusOutlined className={suffixClassName} />}
					<span className={suffixClassName}>{suffixValue}</span>
				</>
			)}
		/>
	);
};

const CovidStatisticFactory = (className, title,
	suffixTitle, value, suffixValue, suffixClassName, showPlusIcon) => {
	return (
		<CovidStatistic
			className={className}
			title={title}
			suffixTitle={suffixTitle}
			value={value}
			suffixValue={suffixValue}
			suffixClassName={suffixClassName}
			showPlusIcon={showPlusIcon}
		/>
	);
};

export { CovidStatisticFactory };
export default CovidStatistic;
