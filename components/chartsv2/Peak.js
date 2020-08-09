/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import line from 'echarts/lib/chart/line';
import CovidDataIndia from '../../classes/CovidDataIndia';

export const PeakChart = ({ data }) => {
	const [image, setImage] = useState(null);
	const container = useRef(null);
	const chartWidth = useRef(0);
	useEffect(() => {
		console.log(data);
		if (!container.current) {
			return;
		}
		chartWidth.current = container.current.parentElement.offsetWidth - 16;
		const chart = echarts.init(container.current, {},
			{ width: chartWidth.current, height: 55 });
	}, []);
	return (
		<div>Peak</div>
	);
};
