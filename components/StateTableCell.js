import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const StateTableCell = ({ value, delta, showCaret }) => {
	const icon = delta > 0
		? <CaretUpOutlined className="red" />
		: <CaretDownOutlined className="green" />;
	return (
		<>
			<div>
				{(delta !== 0 && showCaret) && icon }{(!showCaret && delta > 0) && '+'}{Math.abs(delta)}
			</div>
			<div className="count">{value}</div>
		</>
	);
};

export default StateTableCell;
