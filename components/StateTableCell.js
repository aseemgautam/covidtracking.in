import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const StateTableCell = ({ value, delta, showCaret }) => {
	const icon = delta > 0
		? <CaretUpOutlined className="red" />
		: <CaretDownOutlined className="green" />;
	return (
		<div className="cell-wrapper">
			<div className="count">{value}</div>
			<div className="delta">
				{(delta !== 0 && showCaret) && icon }{(!showCaret && delta > 0) && '+'}{Math.abs(delta)}
			</div>
		</div>
	);
};

export default StateTableCell;
