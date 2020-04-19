/* eslint-disable no-restricted-syntax */
import { List } from 'antd';
import StateCasesRow from './StateCasesRow';

const StateWise = ({ statewiseLatest }) => {
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
			dataSource={statewiseLatest}
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

export default StateWise;
