import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const NewCasesChart = () => {
	const container = useRef(null);
	const data = [
		{ date: '23/03', cases: 103, death: 5, recover: 10 },
		{ date: '24/03', cases: 37, death: 5, recover: 10 },
		{ date: '25/03', cases: 121, death: 5, recover: 10 },
		{ date: '26/03', cases: 70, death: 5, recover: 10 },
		{ date: '27/03', cases: 160, death: 5, recover: 10 },
		{ date: '28/03', cases: 100, death: 5, recover: 10 },
		{ date: '29/03', cases: 37, death: 5, recover: 10 },
		{ date: '30/03', cases: 227, death: 5, recover: 10 },
		{ date: '31/03', cases: 146, death: 5, recover: 10 }
	];
	const formatted = [];
	data.forEach(d => {
		formatted.push({ date: d.date, type: 'cases', value: d.cases },
			{ date: d.date, type: 'death', value: d.death },
			{ date: d.date, type: 'recover', value: d.recover });
	});
	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400
		});

		chart.data(formatted);
		chart.scale('value', {
			nice: true,
		});
		chart.tooltip({
			shared: true,
			showMarkers: false,
		});

		chart
			.interval()
			.position(['date', 'value'])
			.color('type')
			.adjust('stack');

		chart.interaction('active-region');

		chart.render();
	}, [formatted]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default NewCasesChart;
