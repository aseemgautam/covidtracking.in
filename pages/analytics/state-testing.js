import { Breadcrumb } from 'antd';
import DWChart from 'react-datawrapper-chart';

const CasesPerMillion = () => {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>
					<a href="/analytics">Analytics</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Coronavirus India - Testing across states</Breadcrumb.Item>
			</Breadcrumb>
			<br />
			<DWChart title="Chart" src="//datawrapper.dwcdn.net/JN9ce/3/" />
		</>
	);
};

export default CasesPerMillion;
