import { Typography } from 'antd';

const stateCasesRow = props => {
	const { title, active, total, recover, fatal } = props;
	return (
		<>
			<Typography.Text ellipsis>{title}</Typography.Text>
			<div className="state-case-row-stats">
				<div>{active}</div>
				<div>{recover}</div>
				<div>{total}</div>
				<div>{fatal}</div>
			</div>
		</>
	);
};

export default stateCasesRow;
