// eslint-disable-next-line import/no-unresolved
import DWChart from 'react-datawrapper-chart';
import fetch from 'isomorphic-unfetch';

const Districts = ({ chartIndex }) => {
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
			<DWChart title="Chart" src={`//datawrapper.dwcdn.net/sWfDe/${chartIndex}/`} />
		</>
	);
};

export async function getStaticProps() {
	// eslint-disable-next-line max-len
	const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRyjPj_VXGIOYnCy5eoy3YcN9yA_yFKWd4AdkMXFam62N4Ik-D6A6cwFXt2N2LwpncJEd-dFn7s5Ez/pub?gid=1843614518&single=true&output=csv');
	const csv = await res.text();
	return {
		props: {
			chartIndex: csv
		}
	};
}

export default Districts;
