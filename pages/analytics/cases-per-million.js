import { Breadcrumb } from 'antd';
import DWChart from 'react-datawrapper-chart';

const CasesPerMillion = () => {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>
					<a href="/analytics">Analytics</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Cases Per Million</Breadcrumb.Item>
			</Breadcrumb>
			<br />
			<DWChart title="Chart" src="//datawrapper.dwcdn.net/U5VQb/10/" />
		</>
	);
};

export default CasesPerMillion;
