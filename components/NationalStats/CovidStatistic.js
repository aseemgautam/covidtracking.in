import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CovidStatistic = ({ title, value, suffix, className, suffixClassName, precision, now }) => {
	const showPlusIcon = suffix && Number.isInteger(suffix)
		&& suffix > 0;
	const nowElement = (
		<div className="now">
			<div style={{ color: '#595959' }}>Today</div>
			<div>+{now}</div>
		</div>
	);
	return (
		<div className={`${className} covid-statistic`}>
			<Statistic
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
			{now && nowElement}
		</div>
	);
};

export default CovidStatistic;
