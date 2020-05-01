import React, { useRef, useEffect, useState } from 'react';
import { Chart } from '@antv/g2';
import { Select, Row, Col } from 'antd';
import _ from 'lodash';
import Analytics from '../../classes/Analytics';

const { Option } = Select;

const StateGrowth = () => {
	const [selectedStates, setSelectedStates] = useState(Analytics.topNAffected(3));
	const [days, setDays] = useState(14);
	const showPeak = useRef(true);
	const { states } = Analytics;
	const children = [];

	const chart = useRef(null);

	if (states && Array.isArray(states)) {
		states.forEach(value => {
			children.push(<Option label={value.code} key={value.name}>{value.name}({value.code})</Option>);
		});
	}
	function clearAnnotations() {
		if (chart.current) {
			chart.current.annotation().clear(true);
		}
	}
	function drawAnnotations() {
		const peaks = _.filter(Analytics.activeCasesPeak,
			val => { return selectedStates.includes(val.state); });
		if (chart.current && Array.isArray(peaks)) {
			chart.current.annotation().clear(true);
			peaks.forEach(peak => {
				chart.current.annotation().dataMarker({
					position: [peak.date, peak.active],
					// text: {
					// 	content: peak.active,
					// 	style: {
					// 		textAlign: 'center'
					// 	}
					// },
					top: true,
					line: {
						length: 0
					},
					point: {
						style: {
							lineWidth: 2,
							fill: '#f5222d',
							stroke: '#f5222d',
						}
					},
				});
			});
			chart.current.paint(true);
		}
	}

	function refreshAnnotations() {
		if (showPeak.current === true) drawAnnotations(); else clearAnnotations();
	}

	function onTopNChange(n) {
		setSelectedStates(Analytics.topNAffected(n));
	}

	function onSelectedStateChange(e) {
		setSelectedStates(e);
	}

	function onDaysChange(val) {
		setDays(val);
	}

	function onShowPeakChange(e) {
		showPeak.current = e;
		refreshAnnotations();
	}
	useEffect(() => {
		const data = Analytics.stateGrowth(days, selectedStates);
		if (chart.current === null) {
			chart.current = new Chart({
				container: 'stateGrowthChart', // container.current,
				autoFit: true,
				height: 500,
				padding: [50, 20, 50, 40]
			});
			chart.current.legend({
				position: 'top',
				itemHeight: 50
			});
			chart.current.data(data);
			chart.current.scale({
				date: {
					range: [0, 1]
				},
				active: {
					nice: true,
				},
			});

			chart.current.tooltip({
				showCrosshairs: true,
				shared: true,
			});

			chart.current.axis('date', {
				tickLine: true,
				label: {
					formatter: text => {
						return text.replace('2020-', '');
					}
				}
			});
			chart.current
				.line()
				.position('date*active')
				// .shape('hv')
				// .label('active*state*date', (active, state, date) => {
				// 	const day = Number(date.split('-')[2]);
				// 	if (day && day % 4 !== 0) return null;
				// 	return {
				// 		content: active,
				// 		// layout: {
				// 		// 	type: 'overlap',
				// 		// },
				// 		// position: 'start',
				// 		offset: 10,
				// 		style: {
				// 			fill: 'rgba(0, 0, 0, 0.65)',
				// 			// stroke: '#fff',
				// 			fontSize: 10,
				// 			// lineWidth: 3,
				// 		},
				// 	};
				// })
				.color('state')
				.shape('smooth');

			chart.current
				.point()
				.size(3)
				.shape('circle')
				.position('date*active')
				.label('active')
				.color('state');

			// chart.current.removeInteraction('legend-filter');
			chart.current.render();
		} else {
			chart.current.changeData(data);
			chart.current.paint(true);
		}
		refreshAnnotations();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedStates, days]);

	return (
		<>
			<Row gutter={[8, 8]} align="middle" className="chart-options">
				{/* <Col sm={8} md={4}>
					<div className="control">Show Peaks <Switch onChange={onShowPeakChange} /></div>
				</Col> */}
				<Col sm={8} md={4}>
					<Select defaultValue={3} onChange={onTopNChange}>
						<Option value={3}>Top 3 Affected</Option>
						<Option value={5}>Top 5 Affected</Option>
						<Option value={10}>Top 10 Affected</Option>
					</Select>
				</Col>
				<Col sm={8} md={4}>
					<Select defaultValue={14} onChange={onDaysChange}>
						<Option value={7}>7 Days</Option>
						<Option value={14}>14 days</Option>
						<Option value={21}>21 days</Option>
						<Option value={30}>30 Days</Option>
					</Select>
				</Col>
				<Col sm={24} md={12}>
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder="Please select"
						showArrow
						value={selectedStates}
						defaultValue={selectedStates}
						maxTagCount={5}
						maxTagTextLength={8}
						optionLabelProp="label"
						onChange={onSelectedStateChange}
					>
						{children}
					</Select>
				</Col>
			</Row>
			<div id="stateGrowthChart" />
		</>
	);
};

export default StateGrowth;
