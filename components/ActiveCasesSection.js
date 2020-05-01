import { useState } from 'react';
import { Typography, Radio } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import ActiveCasesGrowth from './charts/ActiveCasesGrowth';
import CalenderActiveGrowth from './charts/CalenderActiveGrowth';
import Analytics from '../classes/Analytics';

const { Text } = Typography;

function ActiveCasesSection() {
	const [showCalendar, setShowCalendar] = useState(false);
	function onCalendarShowChange(e) {
		setShowCalendar(e.target.value === 'cal');
	}
	return (
		<>
			<div className="section-head">
				<h4><LineChartOutlined /> ACTIVE CASES</h4>
				<Radio.Group defaultValue="line" onChange={onCalendarShowChange}>
					<Radio.Button value="line">Line</Radio.Button>
					<Radio.Button value="cal">Calendar</Radio.Button>
				</Radio.Group>
			</div>
			<div className="section-content">
				<Text type="secondary">These are the patients being treated for Covid-19 currently.
					Active cases = Confirmed - Recovered - Deaths.
				</Text>
				<br />
				{ showCalendar && (
					<>
						<Text type="secondary">
							The calendar shows growth of active cases in last 30 days. Every
							square represents a day with % increase & count of new active cases.
						</Text>
						<br /><br />
						<Text mark>Date | % increase from previous day | # of new active cases</Text>
					</>
				)}
			</div>
			<ActiveCasesGrowth cases={Analytics.casesForCalendarActiveGrowth} visible={!showCalendar} />
			<CalenderActiveGrowth cases={Analytics.casesForCalendarActiveGrowth} visible={showCalendar} />
		</>
	);
}

export default ActiveCasesSection;
