import { CaretUpOutlined, CaretDownOutlined, PauseOutlined } from '@ant-design/icons';

const StateTableCell = ({ value, delta, showCaret }) => {
	const icon = delta > 0
		? <CaretUpOutlined className="red" />
		: <CaretDownOutlined className="green" />;
	const deltaElement = delta === 0 ? <PauseOutlined rotate={90} /> : Math.abs(delta);
	return (
		<div className="cell-wrapper">
			<div className="count">{value}</div>
			<div className="delta">{showCaret && icon }{(!showCaret && delta > 0) && '+'}{deltaElement}</div>
		</div>
	);
};

export default StateTableCell;
