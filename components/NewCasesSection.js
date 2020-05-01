import { Typography } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import NewCasesChart from './charts/NewCasesChart';
import Analytics from '../classes/Analytics';

const { Text } = Typography;

function ActiveCasesSection() {
	return (
		<>
			<div className="section-head">
				<h4><BarChartOutlined /> NEW CASES</h4>
			</div>
			<div className="section-content">
				<Text type="secondary">
					Daily growth of covid-19 cases for the selected period.
				</Text>
			</div>
			<NewCasesChart cases={Analytics.cases} />
		</>
	);
}

export default ActiveCasesSection;
