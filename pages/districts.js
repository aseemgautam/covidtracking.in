// eslint-disable-next-line import/no-unresolved
import DWChart from 'react-datawrapper-chart';

const Districts = () => {
	return (
		<>
			<h2>COVID-19 District Tracker India</h2>
			<div>
				Tracking spread of COVID-19 across 600+ districts in India.
				Using simple <span style={{ color: '#C71E1D' }}>Red</span>,&nbsp;
				<span style={{ color: '#FA531C' }}>Orange</span>, <span style={{ color: '#FAAD15' }}>Yellow</span>,&nbsp;
				<span style={{ color: '#23994a' }}>Green</span> scales,
				you can see every districts progress towards containing COVID-19.
			</div>
			<br />
			<DWChart title="Chart" src="//datawrapper.dwcdn.net/sWfDe/16/" />
		</>
	);
};

export default Districts;
