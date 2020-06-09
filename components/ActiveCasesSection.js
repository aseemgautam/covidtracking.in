import { useState } from 'react';
import { Radio } from 'antd';
import ActiveCasesGrowth from './charts/ActiveCasesGrowth';
import CalenderActiveGrowth from './charts/CalenderActiveGrowth';
import Analytics from '../classes/Analytics';

function ActiveCasesSection() {
	const [showCalendar, setShowCalendar] = useState(false);
	function onCalendarShowChange(e) {
		setShowCalendar(e.target.value === 'cal');
	}
	return (
		<>
			<div className="active-cases-section-head">
				<h3 className="title"> GROWTH IN ACTIVE CASES</h3>
				<Radio.Group defaultValue="line" onChange={onCalendarShowChange}>
					<Radio.Button value="line">Line</Radio.Button>
					<Radio.Button value="cal">Calendar</Radio.Button>
				</Radio.Group>
			</div>
			<div className="section-content">
				<p>
					Active cases are patients presently being treated for Covid-19.
					Active cases = Confirmed Cases - Recovered - Deaths.
				</p>
			</div>
			<ActiveCasesGrowth cases={Analytics.casesForCalendarActiveGrowth} visible={!showCalendar} />
			<CalenderActiveGrowth cases={Analytics.casesForCalendarActiveGrowth} visible={showCalendar} />
		</>
	);
}

export default ActiveCasesSection;
