import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const GenderRatio = () => {
	const container = useRef(null);
	const data = [
		{ gender: 'Male', percent: 0.76 },
		{ gender: 'Female', percent: 0.24 }
	];
	useEffect(() => {
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: 400
		});

		chart.scale('percent', {
			formatter: val => {
				return `${val * 100}%`;
			},
		});

		chart.coordinate('theta', {
			radius: 0.75,
		});

		chart.data(data);
		chart.tooltip({
			showTitle: false,
			showMarkers: false,
		});
		chart.legend('gender', {
			position: 'top',
			offsetY: 10
		});
		chart
			.interval()
			.adjust('stack')
			.position('percent')
			.color('gender', ['#1890ff', '#f04864'])
			.label('percent', {
				content: value => {
					return `${value.gender}: ${value.percent * 100}%`;
				}
			});

		chart.render();
	}, [data]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default GenderRatio;
