import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import Colors from '../../classes/Colors';

const ActiveCasesGrowth = ({ cases, visible }) => {
	const container = useRef(null);
	const chartRef = useRef(null);
	useEffect(() => {
		if (!container.current) {
			return;
		}

		const isMobile = window.innerWidth < 576;
		const padding = isMobile ? 10 : 15;
		const data = cases.slice(isMobile ? -12 : -22);

		if (!chartRef.current) {
			const chart = new Chart({
				container: container.current,
				autoFit: true,
				height: 700,
				padding: [10, padding, 10, padding]
			});
			chartRef.current = chart;
			chart.removeInteraction('tooltip');
			chart.scale('date', {
				sync: true,
				range: [0, 1],
				mask: 'MM-DD'
			});
			chart.scale('active', { sync: true });
			chart.scale('newActive', { sync: true });
			chart.scale('percent', { nice: true, sync: true });

			chart.tooltip({
				showCrosshairs: true,
				shared: true,
				showContent: false,
				crosshairs: {
					type: 'xy',
					textBackground: {
						padding: 5,
						style: {
							fill: '#fff',
							stroke: '#ccc',
							lineWidth: 1
						}
					},
					text: (type, defaultText, items) => {
						const { color } = items[0];
						if (type === 'x') {
							return {
								offset: 5,
								position: 'end',
								content: defaultText,
								style: {
									textAlign: 'center',
									textBaseline: 'top',
									fill: color,
									fontSize: 11,
								},
							};
						}
						return {
							offset: 5,
							content: defaultText,
							style: {
								textAlign: 'center',
								fill: color,
								fontSize: 11
							}
						};
					} }
			});

			const viewActiveCases = chart.createView({
				region: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.3 } },
			});
			viewActiveCases.axis('date', {
				tickLine: null
			});
			viewActiveCases.data(data);
			viewActiveCases.axis('active', false);
			viewActiveCases.interaction('tooltip');
			viewActiveCases.interaction('sibling-tooltip');
			viewActiveCases.line()
				.color(Colors.chart)
				.label('active')
				.position('date*active');
			const viewNewActiveCases = chart.createView({
				region: { start: { x: 0, y: 0.4 }, end: { x: 1, y: 0.75 } },
			});
			viewNewActiveCases.data(data);
			viewNewActiveCases.axis('newActive', false);
			viewNewActiveCases.axis('date', {
				tickLine: null
			});
			viewNewActiveCases.interaction('tooltip');
			viewNewActiveCases.interaction('sibling-tooltip');
			viewNewActiveCases.interval()
				.color(Colors.chart)
				.label('newActive').position('date*newActive');

			viewNewActiveCases.annotation().text({
				content: 'NEW ACTIVE CASES DAILY',
				position: ['min', 'max'],
				offsetY: -30,
				offsetX: padding * -1,
			});
			// viewNewActiveCases.annotation().line({
			// 	start: ['min', 2000],
			// 	end: ['max', 2000],
			// 	style: {
			// 		stroke: '#ff4d4f',
			// 		lineWidth: 2,
			// 		lineDash: [3, 3],
			// 	}
			// });
			const viewPercentGrowth = chart.createView({
				region: { start: { x: 0, y: 0.75 }, end: { x: 1, y: 1 } },
				padding: [80, padding, 30, padding]
			});
			viewPercentGrowth.annotation().text({
				content: '% increase (daily) in active cases',
				position: ['min', 'max'],
				offsetY: -30,
				offsetX: padding * -1,
			});
			viewPercentGrowth.animate(false);
			viewPercentGrowth.data(data);
			viewPercentGrowth.axis('percent', false);
			viewPercentGrowth.interaction('tooltip');
			viewPercentGrowth.interaction('sibling-tooltip');
			viewPercentGrowth.line()
				.color(Colors.chart)
				.label('percent')
				.position('date*percent');

			chart.render();
			chart.forceFit();
		}
		if (visible) chartRef.current.show(); else chartRef.current.hide();
	});
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default ActiveCasesGrowth;
