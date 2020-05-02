import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const StateTableCell = ({ value, delta, isCaretUpRed }) => {
	const isRed = isCaretUpRed === undefined;
	const icon = delta > 0
		? <CaretUpOutlined className={isRed ? 'red' : 'green'} />
		: <CaretDownOutlined className="green" />;
	return (
		<div className="cell-wrapper">
			<div className="count">{value}</div>
			<div className="delta">{delta !== 0 && icon}{delta !== 0 && Math.abs(delta)}</div>
		</div>
	);
};

export default StateTableCell;
