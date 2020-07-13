import { Breadcrumb } from 'antd';
import DWChart from 'react-datawrapper-chart';

const FarFromPeak = () => {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>
					<a href="/analytics">Analytics</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>How far is India from peak?</Breadcrumb.Item>
			</Breadcrumb>
			<br />
			<DWChart title="Chart" src="//datawrapper.dwcdn.net/nhJtE/4/" />
		</>
	);
};

export default FarFromPeak;
