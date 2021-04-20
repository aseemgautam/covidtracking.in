import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Utils from '../../classes/Utils';

const CovidStatistic = ({ title, value, suffix, className, suffixClassName, precision, formatValue, formatSuffix }) => {
	if (!value || value === 0 || value === '0.00') {
		value = 'N/A';
		suffix = '';
	}
	const showPlusIcon = suffix && suffix > 0;
	const valueFormatted = formatValue === true ? Utils.getIndianNumberFormat(value) : value;
	const suffixFormatted = formatSuffix === true ? Utils.getIndianNumberFormat(suffix) : suffix;
	const suffixElement = suffix ? (
		<>
			{showPlusIcon && <PlusOutlined className={suffixClassName} />}
			<span className={suffixClassName}>{suffixFormatted}</span>
		</>
	) : null;
	return (
		<div className={`${className} covid-statistic`}>
			<Statistic
				title={title}
				value={valueFormatted}
				precision={precision}
				suffix={suffixElement}
			/>
		</div>
	);
};

export default CovidStatistic;
