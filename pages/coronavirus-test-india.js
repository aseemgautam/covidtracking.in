import { Row, Col, Breadcrumb } from 'antd';
import StateGroup from '../components/StateGroup';
import StateJSON from '../public/india-states.json';

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
			<Breadcrumb>
				<Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
				<Breadcrumb.Item>Coronavirus Testing Labs</Breadcrumb.Item>
			</Breadcrumb>
			<h1>LIST OF CERTIFIED LABS FOR CORONAVIRUS TEST (COVID - 19)</h1>
			<span>Click on any state to view certified coronavirus laboratories (Goverment & Private).
			</span>
			<br /><br />
			<Row>{linkGroups}</Row>
		</>
	);
};

export async function getStaticProps() {
	const stateGroups = StateJSON.states.reduce((acc, state) => {
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
