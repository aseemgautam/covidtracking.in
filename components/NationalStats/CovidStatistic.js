import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CovidStatistic = ({ title, value, suffix, className, suffixClassName, precision }) => {
	if (!value || value === 0 || value === '0.00') {
		value = 'N/A';
		suffix = '';
	}
	const showPlusIcon = suffix && Number.isInteger(suffix)
		&& suffix > 0;
	const suffixElement = suffix ? (
		<>
			{showPlusIcon && <PlusOutlined className={suffixClassName} />}
			<span className={suffixClassName}>{suffix}</span>
		</>
	) : null;
	return (
		<div className={`${className} covid-statistic`}>
			<Statistic
				title={title}
				value={value}
				precision={precision}
				suffix={suffixElement}
			/>
		</div>
	);
};

export default CovidStatistic;
