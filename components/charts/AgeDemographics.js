import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const AgeDemographics = () => {
	const container = useRef(null);
	const data = [
		{ age: '0 - 20', percent: 8.61 },
		{ age: '21 - 40', percent: 41.88 },
		{ age: '41 - 60', percent: 32.82 },
		{ age: '60 +', percent: 16.69 },
	];
	useEffect(() => {
		if (!container.current) {
			return;
		}
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400,
		});
		chart.tooltip({
			showTitle: false
		});
		chart.data(data);
		chart.scale('percent', { nice: true });
		chart.coordinate().transpose();
		chart.interaction('active-region');
		chart.interval().position('age*percent')
			.tooltip('age*percent',
				(age, percent) => {
					return {
						name: `${age} years`,
						value: `${percent}% cases`
					};
				});
		chart.render();
	}, [data]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default AgeDemographics;
