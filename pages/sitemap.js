import _ from 'lodash';
import Districts from '../classes/Districts';

const Sitemap = ({ paths }) => {
	const states = _.uniq(_.map(paths, 'state')).map(state => {
		return <a href={`coronavirus-cases/${state}`}>{state}</a>;
	});
	const districts = paths.map(path => {
		return <a href={`coronavirus-cases/${path.state}/${path.district}`}>{path.district}</a>;
	});
	// const districts =
	return (
		<div className="sitemap">
			<h3>States</h3>
			<div>{states}</div>
			<br />
			<h3>Districts</h3>
			<div>{districts}</div>
		</div>
	);
};

export async function getStaticProps() {
	const paths = [];
	const districts = await Districts.latest();
	districts.forEach(district => {
		const stateName = district.state.toLocaleLowerCase().split(' ').join('-');
		const districtName = district.district.toLocaleLowerCase().split(' ').join('-').split('.')
			.join('');
		paths.push({ state: stateName, district: districtName });
	});
	return {
		props: { paths }
	};
}

export default Sitemap;
