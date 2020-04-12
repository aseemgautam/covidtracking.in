import React, { useRef, useEffect } from 'react';
import { Pie } from '@antv/g2plot';

const GenderRatio = () => {
	const container = useRef(null);
	const data = [
		{ Gender: 'Male', value: 76 },
		{ Gender: 'Female', value: 24 }
	];
	useEffect(() => {
		if (!container.current) {
			return;
		}
		const piePlot = new Pie(container.current, {
			forceFit: true,
			// title: {
			// 	visible: true,
			// 	text: 'Covid-19 Cases Gender',
			// },
			// description: {
			// 	visible: true,
			// 	text: 'Covid - 19 cases affect 77% of males & 23% of females',
			// },
			radius: 0.7,
			data,
			angleField: 'value',
			colorField: 'Gender',
			tooltip: {
				visible: false
			},
			label: {
				visible: true,
				type: 'spider',
				formatter: (text, item, id) => {
					return [data[id].Gender, `${data[id].value}%`];
				}
			},
			renderer: 'svg'
		});
		piePlot.render();
	}, [data]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default GenderRatio;
