const StateGroup = ({ groupName, states }) => {
	const links = states.map(state => {
		const stateLink = state.replace(/ /g, '-').toLowerCase();
		return (
			<a key={stateLink} href={`/coronavirus-test-india/${stateLink}`}>{state}</a>
		);
	});
	return (
		<div className="state-group">
			<h2>{groupName}</h2>
			{links}
		</div>
	);
};

export default StateGroup;
