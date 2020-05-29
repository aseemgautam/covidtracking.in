import React, { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

const LineChartSmall = React.memo(({ data, fieldX, fieldY, width, widthSmall, height }) => {
	const container = useRef(null);
	useEffect(() => {
		if (!container.current || !data) {
			return;
		}
		const isMobile = window.innerWidth < 576;
		const chart = new Chart({
			container: container.current,
			autoFit: true,
			height: height ?? 60,
			width: isMobile ? widthSmall : width,
			padding: [15, 20, 0, 20]
		});
		chart.annotation().text({
			content: data[0][fieldY],
			position: [data[0][fieldX], data[0][fieldY]],
			offsetX: -15,
			offsetY: -10,
			style: {
				fontSize: 10
			}
		});
		chart.annotation().text({
			content: data[data.length - 1][fieldY],
			position: [data[data.length - 1][fieldX], data[data.length - 1][fieldY]],
			offsetX: -15,
			offsetY: -10,
			style: {
				fontSize: 10
			}
		});

		chart.data(data);
		chart.axis([fieldY], false);
		chart.axis(fieldY, false);
		chart.scale({
			[fieldY]: {
				nice: true,
			},
			[fieldX]: {
				range: [0, 1],
			},
		});

		chart.tooltip(false);

		chart.area().position(`${fieldX}*${fieldY}`);
		chart.line().position(`${fieldX}*${fieldY}`).size(1).shape('smooth');

		chart.render();
	});
	return (
		<>
			<div ref={container} />
		</>
	);
});

export default LineChartSmall;
