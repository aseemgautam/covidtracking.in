import { Tag } from 'antd';
import DailyReportTable from './DailyReportTable';

const DailyReportSection = ({ casesByStateLatest }) => {
	const tags = (
		<div>
			<Tag color="red">New High (H)</Tag>
			<Tag color="orange">14 Day High (H)</Tag>
			<Tag style={{ color: '#237804' }} color="green">14 Day Low (L)</Tag>
		</div>
	);
	return (
		<>
			<p className="daily-help-text">
				Percentages (%) show change from average.
				For eg. +12% in Tests would mean, today there were 12% more tests done for that state, compared
				to average tests done in last 7 days. <b>WCT</b> = Weekly cases trend. <b>WTT</b> = Weekly testing trend.
			</p>
			{tags}
			<DailyReportTable casesByStateLatest={casesByStateLatest} />
		</>
	);
};

export default DailyReportSection;
