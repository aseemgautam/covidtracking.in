import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Colors from '../classes/Colors';

const TrendIndicator = ({ value, isPercent, reverse, width }) => {
	width = width ?? 72;
	const absValue = Math.abs(value);
	let icon; let text; let className;
	text = `${absValue}${isPercent ? '%' : ''}`;
	if (value > 0) {
		icon = <CaretUpOutlined style={{ color: `${reverse ? Colors.red : Colors.green}` }} />;
		className = reverse ? 'trend-tag-red' : 'trend-tag-green';
	} else if (value < 0) {
		icon = <CaretDownOutlined style={{ color: `${reverse ? Colors.green : Colors.red}` }} />;
		className = reverse ? 'trend-tag-green' : 'trend-tag-red';
	} else {
		className = 'trend-tag-grey';
		text = 'No Change';
	}
	return (
		<div className="flex-row-center">
			<div className={className} style={{ width }}>
				{icon} {text}
			</div>
		</div>
	);
};

export default TrendIndicator;
