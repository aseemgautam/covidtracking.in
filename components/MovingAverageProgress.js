import { Progress } from 'antd';
import Colors from '../classes/Colors';

const MovingAverageProgress = ({ rateOfInc }) => {
	let percent = rateOfInc;
	if (rateOfInc <= 0) {
		percent = 100;
	}
	if (rateOfInc > 0 && rateOfInc <= 20) percent = 30;
	if (rateOfInc > 20 && rateOfInc < 50) percent = 75;
	if (rateOfInc > 50) percent = 110;
	return (
		<Progress
			percent={percent}
			showInfo={false}
			status="normal"
			steps={4}
			strokeColor={Colors.getTrendColor(rateOfInc)}
		/>
	);
};

export default MovingAverageProgress;
