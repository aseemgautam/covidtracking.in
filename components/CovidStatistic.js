import { Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CovidStatistic = ({ title, suffixTitle, value, suffixValue, suffixClassName }) => {
	return (
		<Statistic
			className="covid-statistic-with-suffix"
			title={(
				<>
					<span>{title}</span>
					<span>{suffixTitle}</span>
				</>
			)}
			value={value}
			precision={0}
			suffix={(
				<>
					<PlusOutlined className={suffixClassName} />
					<span className={suffixClassName}>{suffixValue}</span>
				</>
			)}
		/>
	);
};

const CovidStatisticFactory = (title, suffixTitle, value, suffixValue, suffixClassName) => {
	return (
		<CovidStatistic
			title={title}
			suffixTitle={suffixTitle}
			value={value}
			suffixValue={suffixValue}
			suffixClassName={suffixClassName}
		/>
	);
};

export { CovidStatisticFactory };
export default CovidStatistic;
