import { Layout, Space, Row, Col, Menu, Dropdown } from 'antd';
import { MenuOutlined, PhoneOutlined, BarChartOutlined,
	ScheduleOutlined, RiseOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const tracker = <a href="/"><RiseOutlined /> Tracker</a>;
const analytics = <a href="/"><BarChartOutlined /> Analytics</a>;
const helpline = <a href="/helpline"><PhoneOutlined /> Helpline</a>;
const testing = <a href="/coronavirus-test-india"><ScheduleOutlined /> Testing</a>;
const menu = (
	<Menu>
		<Menu.Item>
			{tracker}
		</Menu.Item>
		<Menu.Item>
			{analytics}
		</Menu.Item>
		<Menu.Item>
			{helpline}
		</Menu.Item>
		<Menu.Item>
			{testing}
		</Menu.Item>
	</Menu>
);
const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col xs={1} sm={1} lg={1} xl={2} />
					<Col className="logo" xs={18} sm={10} lg={6} xl={6}>
						<img src="/india.png" alt="india" />
						<a href="/">Coronavirus India Wiki</a>
					</Col>
					<Col xs={4} sm={0} className="mobile-navigation">
						<Dropdown overlay={menu}>
							<MenuOutlined />
						</Dropdown>
					</Col>
					<Col xs={0} sm={12} lg={16} xl={14}>
						<Space size="middle" className="navigation">
							{tracker}
							{analytics}
							{helpline}
							{testing}
						</Space>
					</Col>
					<Col xs={1} sm={1} lg={1} xl={2} />
				</Row>
			</Header>
			<Content>
				<Row>
					<Col xs={0} sm={0} md={1} lg={1} xl={2} />
					<Col xs={24} sm={24} md={22} lg={22} xl={20}>
						{children}
					</Col>
					<Col xs={0} sm={0} md={1} lg={1} xl={2} />
				</Row>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Covid 19 Wiki</Footer>
		</Layout>
	);
};

export default SiteLayout;
