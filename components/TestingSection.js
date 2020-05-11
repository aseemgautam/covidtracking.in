import { Typography } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import TetsingChart from './charts/Testing';
import Analytics from '../classes/Analytics';

const { Text } = Typography;

function testingSection() {
	return (
		<>
			<div className="section-head">
				<h4><BarChartOutlined /> Covid-19 Testing</h4>
			</div>
			<div className="section-content">
				<Text type="secondary">
					Testing & rate of infections daily.
				</Text>
			</div>
			<TetsingChart cases={Analytics.cases} />
		</>
	);
}

export default testingSection;
