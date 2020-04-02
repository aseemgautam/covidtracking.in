const stateCasesRow = props => {
	const { title, active, total, recover, fatal } = props;
	return (
		<div className="state-panel-header">
			<div>{title}</div>
			<div className="state-panel-stats">
				<div>{active}</div>
				<div>{recover}</div>
				<div>{total}</div>
				<div>{fatal}</div>
			</div>
		</div>
	);
};

export default stateCasesRow;
