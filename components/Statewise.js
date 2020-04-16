/* eslint-disable no-restricted-syntax */
import { List } from 'antd';
import StateCasesRow from './StateCasesRow';
import Analytics from '../classes/Analytics';

export default () => {
	let cases = [];
	for (const key in Analytics.casesByState) {
		if (Object.prototype.hasOwnProperty.call(Analytics.casesByState, key)
			&& Array.isArray(Analytics.casesByState[key])) {
			cases.push(Analytics.casesByState[key].pop());
		}
	}
	cases = cases.sort((a, b) => {
		return b.confirmed - a.confirmed;
	});
	return (
		<List
			className="state-table"
			header={(
				<>
					<div>Confirm</div>
					<div>Active</div>
					<div className="red-8">Deaths</div>
					<div className="green">Cured</div>
				</>
			)}
			pagination={{
				pageSize: 9,
			}}
			dataSource={cases}
			renderItem={state => {
				return (
					<List.Item className="state-case-row">
						<StateCasesRow state={state} />
					</List.Item>
				);
			}}
		/>
	);
};
