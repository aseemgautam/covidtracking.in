import Link from 'next/link';
import { Layout, Space, Row, Col, Menu, Dropdown } from 'antd';
import { MenuOutlined, TwitterOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const tracker = <Link href="/"><a>TRACKER</a></Link>;
const analytics = <Link href="/analytics"><a>ANALYTICS</a></Link>;
const menu = (
	<Menu>
		<Menu.Item>
			{tracker}
		</Menu.Item>
		<Menu.Item>
			{analytics}
		</Menu.Item>
	</Menu>
);
const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col className="logo" xs={20} sm={18} md={12} lg={8}>
						<a href="/">COVID TRACKING INDIA</a>
					</Col>
					<Col xs={4} sm={6} md={0} className="mobile-navigation">
						<Dropdown overlay={menu}>
							<MenuOutlined />
						</Dropdown>
					</Col>
					<Col xs={0} sm={0} md={12} lg={16}>
						<Space size="middle" className="navigation">
							{tracker}
							{analytics}
						</Space>
					</Col>
				</Row>
			</Header>
			<Content>
				<Row>
					<Col span={24}>
						{children}
					</Col>
				</Row>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				<Row>
					<Col className="footer-about" xs={24} sm={16} md={14} lg={16} xl={14}>
						<div className="logo">
							<a href="/">COVID TRACKING INDIA</a>
						</div>
						<br />
						<div>
							Tracking spread of covid-19 in India using scientific & mathematical models. Calulating 7 & 14
							day trends of new cases to track speed of new infections & growth of covid-19 in different states.
						</div>
					</Col>
					<Col className="footer-twitter" xs={24} sm={8} md={8} lg={6} xl={6}>
						<div className="btn-twitter">
							<a
								rel="noopener noreferrer"
								target="_blank"
								href="https://twitter.com/CovidTrackingIn"
							>
								<TwitterOutlined /> Follow on twitter
							</a>
						</div>
					</Col>
				</Row>
			</Footer>
		</Layout>
	);
};

export default SiteLayout;
