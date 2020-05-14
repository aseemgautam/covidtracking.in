import Link from 'next/link';

const StateGroup = ({ groupName, states }) => {
	const links = states.map(state => {
		const stateLink = state.replace(/ /g, '-').toLowerCase();
		return (
			<Link key={stateLink} href={`/coronavirus-testing-labs/${stateLink}`}>
				<a>{state}</a>
			</Link>
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
