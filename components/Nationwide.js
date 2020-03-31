/* eslint-disable import/no-extraneous-dependencies */
import { Statistic, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Nationwide = () => {
	return (
		<div className="site-statistic">
			<Row className="section-heading" justify="space-between">
				<Col flex={2}>
					<h3>National</h3>
				</Col>
				<Col flex={3}>
					<span>Last updated 3 hours ago</span>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xs={12} sm={8}>
					<Statistic
						title="Total"
						value="27"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={12} sm={8}>
					<Statistic
						title="Today"
						value={125}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						prefix={<PlusOutlined />}
						suffix="new cases"
					/>
				</Col>
				<Col xs={0} sm={8}>
					<Statistic
						title="Stage"
						value="2"
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						suffix="Local Transmission"
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="Active"
						value={766}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="Recovered"
						value={21}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={8} sm={8}>
					<Statistic
						title="Fatal"
						value={21}
						precision={0}
						// valueStyle={{ color: '#cf1322' }}
						// prefix={<ArrowDownOutlined />}
					/>
				</Col>
				<Col xs={24} sm={0}>
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
