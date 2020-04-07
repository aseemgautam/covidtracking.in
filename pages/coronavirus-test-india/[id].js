import { Row, Col, Breadcrumb } from 'antd';
import fetch from 'node-fetch';
import Head from 'next/head';
import LabCard from '../../components/LabCard';

const Labs = ({ labs, state }) => {
	const labElements = labs.map(lab => {
		return (
			<Col xs={24} sm={24} md={12} key={lab.id}>
				<LabCard lab={lab} />
			</Col>
		);
	});
	return (
		<>
			<Head>
				<title>List of certified coronavirus (Covid-19) testing labs in {state}</title>
			</Head>
			<Breadcrumb>
				<Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
				<Breadcrumb.Item>
					<a href="/coronavirus-test-india">Coronavirus Testing Labs</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item className="capitalize">{state}</Breadcrumb.Item>
			</Breadcrumb>
			<h1 className="uppercase">
				List of certified coronavirus testing labs in {state}
			</h1>
			<span>Goverment approved private & public labrotaries for coronavirus testing.</span>
			<br /><br />
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				{labElements}
			</Row>
		</>
	);
};

export async function getStaticProps(context) {
	let currentState = context.params.id;
	currentState = currentState.replace(/-/g, ' ');
	const allLabs = await (await fetch('http://localhost:3000/labs.json')).json();
	const labs = allLabs.items.filter(item => {
		const stateName = item.state.trim().toLowerCase();
		return stateName === currentState;
	});
	return {
		props: { labs, state: currentState }, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	const statesJson = await (await fetch('http://localhost:3000/india-states.json')).json();
	const paths = statesJson.states.map(state => {
		const stateName = state.name.replace(/ /g, '-');
		return {
			params: { id: stateName.toLowerCase() }
		};
	});
	return {
		paths: [
			...paths
		],
		fallback: false // See the "fallback" section below
	};
}

export default Labs;
