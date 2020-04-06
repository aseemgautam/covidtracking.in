import { Row, Col, Select } from 'antd';
import NationWide from '../components/Nationwide';
import Charts from '../components/Charts';

const { Option } = Select;


const Index = () => {
	return (
		<>
			{/* <Row className="national-radio" justify="space-between" align="middle">
				<Col flex={2}>
					<Select
						defaultValue={1}
						showSearch
						style={{ width: 200 }}
						optionFilterProp="children"
						disabled
						onChange={onChange}
						onFocus={onFocus}
						onBlur={onBlur}
						onSearch={onSearch}
						filterOption={(input, option) => {
							return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
					>
						<Option value={1}>India</Option>
						<Option value={2}>Andhra Pradesh</Option>
						<Option value={3}>Punjab</Option>
					</Select>
				</Col>
			</Row> */}
			<NationWide />
			<Charts />
			{/* <br />
			<Statewise /> */}
		</>
	);
};

export default Index;
