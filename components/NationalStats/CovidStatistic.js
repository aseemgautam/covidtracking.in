import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CovidStatistic = ({ title, value, suffix, className, suffixClassName, precision }) => {
	const showPlusIcon = suffix && Number.isInteger(suffix)
		&& suffix > 0;
	return (
		<Statistic
			className={`${className} covid-statistic`}
			title={title}
			value={value}
			precision={precision}
			suffix={(
				<>
					{showPlusIcon && <PlusOutlined className={suffixClassName} />}
					<span className={suffixClassName}>{suffix}</span>
				</>
			)}
		/>
	);
};

export default CovidStatistic;
