import { Row, Col, Breadcrumb } from 'antd';
import _ from 'lodash';
import StateGroup from '../components/StateGroup';

const coronavirusTest = props => {
	const { states } = props;
	const stateGroups = states.reduce((acc, state) => {
		const group = state[0];
		if (!acc[group]) acc[group] = { group, children: [state] };
		else acc[group].children.push(state);
		return acc;
	}, {});
	const linkGroups = Object.values(stateGroups).map(group => {
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
	const labsJson = await import('../public/labs.json');
	// eslint-disable-next-line consistent-return
	const states = _.uniq(_.map(labsJson.items, item => {
		// eslint-disable-next-line no-restricted-globals
		if (item.state && item.state.trim() && isNaN(item.state.trim())) {
			return item.state.trim().replace(',', '');
		}
	}));
	return {
		props: { states: _.compact(states).sort() }, // will be passed to the page component as props
	};
}

export default coronavirusTest;
