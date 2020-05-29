import { Progress } from 'antd';
import Analytics from '../classes/Analytics';

const MovingAverageProgress = ({ rateOfInc }) => {
	const settings = Analytics.getProgressColorAndPercent(rateOfInc);
	return (
		<Progress
			percent={settings.percent}
			showInfo={false}
			status="normal"
			steps={4}
			strokeColor={settings.color}
		/>
	);
};

export default MovingAverageProgress;
