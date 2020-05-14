import Link from 'next/link';
import { Layout, Space, Row, Col, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined, PhoneOutlined, BarChartOutlined,
	ScheduleOutlined, RiseOutlined, TwitterOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const tracker = <Link href="/"><a><RiseOutlined /> Tracker</a></Link>;
const analytics = <Link href="/analytics"><a><BarChartOutlined /> Analytics</a></Link>;
const helpline = <Link href="/helpline"><a><PhoneOutlined /> Helpline</a></Link>;
const testing = <Link href="/coronavirus-testing-labs"><a><ScheduleOutlined /> Testing</a></Link>;
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
					<Col className="logo" xs={18} sm={16} md={9} lg={6} xl={6}>
						<img src="/india.png" alt="india" />
						<a href="/">Covid-19 Insights</a>
					</Col>
					<Col xs={4} sm={6} md={0} className="mobile-navigation">
						<Dropdown overlay={menu}>
							<MenuOutlined />
						</Dropdown>
					</Col>
					<Col xs={0} sm={0} md={13} lg={16} xl={14}>
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
					<Col xs={0} sm={1} md={1} lg={1} xl={2} />
					<Col xs={24} sm={22} md={22} lg={22} xl={20}>
						{children}
					</Col>
					<Col xs={0} sm={1} md={1} lg={1} xl={2} />
				</Row>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				<Row>
					<Col xs={0} sm={0} md={1} lg={1} xl={2} />
					<Col className="footer-about" xs={24} sm={16} md={14} lg={16} xl={14}>
						<h3>About</h3>
						<p>
							Insights on covid-19 (coronavirus) spread in India. While news media likes
							to highlight new cases & highs, tracking actual growth of covid-19
							is rather complex & difficult.
							<br />
							There could be some areas doing great but others not so. We try to provide
							a deeper analysis on what is actually going on in different parts of India.
						</p>
					</Col>
					<Col className="footer-twitter" xs={24} sm={8} md={8} lg={6} xl={6}>
						<Button icon={<TwitterOutlined />}>Follow on twitter</Button>
						<div>Developed By
							<a
								href="https://www.linkedin.com/in/aseemgautam/"
								rel="noopener noreferrer"
								target="_blank"
							> Aseem Gautam
							</a>
						</div>
					</Col>
					<Col xs={0} sm={0} md={1} lg={1} xl={2} />
				</Row>
			</Footer>
		</Layout>
	);
};

export default SiteLayout;
