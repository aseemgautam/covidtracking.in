import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const ActiveCasesGrowth = ({ cases, visible }) => {
	const container = useRef(null);
	const chartRef = useRef(null);
	useEffect(() => {
		if (!container.current) {
			return;
		}

		const isMobile = window.innerWidth < 576;
		const padding = isMobile ? 10 : 15;
		const data = cases.slice(isMobile ? -10 : -15);

		if (!chartRef.current) {
			const chart = new Chart({
				container: container.current,
				autoFit: true,
				height: 600,
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
							fill: '#fff1b8'
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
			// chart.tooltip({
			// 	showCrosshairs: true
			// });
			const viewActiveCases = chart.createView({
				region: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.3 } },
			});
			viewActiveCases.axis('date', false);
			viewActiveCases.data(data);
			viewActiveCases.axis('active', false);
			viewActiveCases.interaction('tooltip');
			viewActiveCases.interaction('sibling-tooltip');
			viewActiveCases.line()
				.label('active')
				.position('date*active');
			const viewNewActiveCases = chart.createView({
				region: { start: { x: 0, y: 0.4 }, end: { x: 1, y: 0.8 } },
			});
			viewNewActiveCases.data(data);
			viewNewActiveCases.axis('newActive', false);
			viewNewActiveCases.axis('date', false);
			viewNewActiveCases.interaction('tooltip');
			viewNewActiveCases.interaction('sibling-tooltip');
			viewNewActiveCases.interval().label('newActive').position('date*newActive');

			viewNewActiveCases.annotation().text({
				content: 'NEW ACTIVE CASES DAILY (Red Line, new active cases > 1000)',
				position: ['min', 'max'],
				offsetY: -30,
				offsetX: padding * -1,
			});
			viewNewActiveCases.annotation().line({
				start: ['min', 1000],
				end: ['max', 1000],
				style: {
					stroke: '#ff4d4f',
					lineWidth: 1,
					lineDash: [3, 3],
				}
			});
			const viewPercentGrowth = chart.createView({
				region: { start: { x: 0, y: 0.8 }, end: { x: 1, y: 1 } },
				padding: [40, padding, 30, padding]
			});
			viewPercentGrowth.annotation().text({
				content: '% increase (daily) in active cases',
				position: ['min', 'max'],
				offsetY: -25,
				offsetX: padding * -1,
			});
			viewPercentGrowth.animate(false);
			viewPercentGrowth.data(data);
			viewPercentGrowth.axis('percent', false);
			viewPercentGrowth.interaction('tooltip');
			viewPercentGrowth.interaction('sibling-tooltip');
			viewPercentGrowth.line()
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
