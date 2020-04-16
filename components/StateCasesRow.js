import { Typography } from 'antd';

const stateCasesRow = props => {
	const { state } = props;
	return (
		<>
			<Typography.Text className="state-name" ellipsis>{state.state}</Typography.Text>
			<div className="state-case-row-stats">
				<div className="row-cell-today red">+{state.newCases}</div>
				<div>{state.confirmed}</div>
				<div>{state.active}</div>
				<div>{state.deaths}</div>
				<div>{state.recovered}</div>
			</div>
		</>
	);
};

export default stateCasesRow;
