import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const TableCellCasesGrowth = React.memo(props => {
	const container = useRef(null);
	const data = props.data.last7DaysActive;
	useEffect(() => {
		if (!container.current) {
			return;
		}
		// const data = [
		// 	{ year: '1991', value: 15468 },
		// 	{ year: '1992', value: 16100 },
		// 	{ year: '1993', value: 15900 },
		// 	{ year: '1994', value: 17409 },
		// 	{ year: '1995', value: 17000 },
		// 	{ year: '1996', value: 31056 },
		// 	{ year: '1997', value: 31982 },
		// 	{ year: '1998', value: 32040 },
		// 	{ year: '1999', value: 33233 },
		// ];
		const chart = new Chart({
			container: container.current,
			autoFit: false,
			height: 45,
			width: 120,
			padding: [15, 20, 0, 20]
		});
		chart.annotation().text({
			content: data[0].active,
			position: [data[0].date, data[0].active],
			offsetX: -15,
			offsetY: -10,
			style: {
				fontSize: 10
			}
		});
		chart.annotation().text({
			content: data[data.length - 1].active,
			position: [data[data.length - 1].date, data[data.length - 1].active],
			offsetX: -15,
			offsetY: -10,
			style: {
				fontSize: 10
			}
		});
		// chart.annotation().text({
		// 	content: '33.9k',
		// 	position: ['1999', 33233],
		// 	offsetX: -10,
		// 	offsetY: -7
		// });

		chart.data(data);
		chart.axis('date', false);
		chart.axis('active', false);
		chart.scale({
			active: {
				nice: true,
			},
			date: {
				range: [0, 1],
			},
		});

		chart.tooltip(false);

		chart.area().position('date*active');
		chart.line().position('date*active').size(1).shape('smooth');

		chart.render();
	});
	return (
		<>
			<div ref={container} />
		</>
	);
});

export default TableCellCasesGrowth;
