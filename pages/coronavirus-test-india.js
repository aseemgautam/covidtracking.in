import { Row, Col } from 'antd';
import fetch from 'node-fetch';
import StateGroup from '../components/StateGroup';

const coronavirusTest = ({ groups }) => {
	const linkGroups = groups.map(group => {
		return (
			<Col key={group.group} xs={24} sm={12} md={12} lg={8}>
				<StateGroup groupName={group.group} states={group.children} />
			</Col>
		);
	});
	return (
		<>
			<h1>STATE WISE LIST OF CERTIFIED LABS FOR CORONAVIRUS TESTS (COVID - 19)</h1>
			<span>Please click on a state to view list of certified labs in that state.</span>
			<Row>{linkGroups}</Row>
		</>
	);
};

export async function getStaticProps() {
	// Call an external API endpoint to get posts.
	const json = await (await fetch('http://localhost:3000/india-states.json')).json();
	const stateGroups = json.states.reduce((acc, state) => {
		const group = state.name[0];
		if (!acc[group]) acc[group] = { group, children: [state.name] };
		else acc[group].children.push(state.name);
		return acc;
	}, {});
	return {
		props: {
			groups: Object.values(stateGroups),
		},
	};
}

export default coronavirusTest;
