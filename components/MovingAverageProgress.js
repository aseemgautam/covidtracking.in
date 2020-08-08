import { Progress } from 'antd';
import Colors from '../classes/Colors';

const MovingAverageProgress = ({ rateOfInc, newCases }) => {
	let percent = rateOfInc;
	if (rateOfInc <= 0) {
		percent = 100;
	}
	return (
		<Progress
			percent={percent}
			showInfo={false}
			trailColor="#dfdfdf"
			// steps={4}
			strokeColor={Colors.getTrendColor(rateOfInc, newCases)}
		/>
	);
};

export default MovingAverageProgress;
