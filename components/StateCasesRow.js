import { Typography } from 'antd';

const stateCasesRow = props => {
	const { title, active, total, recover, fatal } = props;
	return (
		<>
			<Typography.Text className="state-name" ellipsis>{title}</Typography.Text>
			<div className="state-case-row-stats">
				<div className="row-cell-today red">+999</div>
				<div>{total}</div>
				<div>{active}</div>
				<div>{fatal}</div>
				<div>{recover}</div>
			</div>
		</>
	);
};

export default stateCasesRow;
