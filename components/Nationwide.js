/* eslint-disable import/no-extraneous-dependencies */
import { Statistic, Row, Col, Radio, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Nationwide = () => {
	return (
		<div>
			<Row className="national-radio" justify="space-between" align="middle">
				<Col flex={2}>
					<Radio.Group defaultValue={0}>
						<Radio.Button value={0}>India</Radio.Button>
						<Radio.Button value={1} disabled>World (coming soon)</Radio.Button>
					</Radio.Group>
				</Col>
				<Col flex>
					<Tag color="#87d068" className="live-tag">Live</Tag>
				</Col>
			</Row>
			{/* <br /> */}
			<Row gutter={[16, 16]}>
				<Col xs={8} sm={8}>
					<Statistic
						title="Total"
						value="2547"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="New Cases"
						value={345}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						prefix={<PlusOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="New Deaths"
						value={111}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						prefix={<PlusOutlined />}
					/>
				</Col>
				{/* <Col xs={0} sm={8}>
					<Statistic
						title="Stage"
						value="2"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						suffix="Local Transmission"
					/>
				</Col> */}
				<Col xs={8} sm={8}>
					<Statistic
						title="Active"
						value={2311}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="Total Recovered"
						value={199}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="Total Deaths"
						value={66}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={12} sm={12}>
					<Statistic
						title="Tests"
						value="38,976"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// suffix="Local Transmission"
					/>
				</Col>
				<Col xs={12} sm={12}>
					<Statistic
						title="Stage"
						value="2"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						suffix="Local Transmission"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Nationwide;
