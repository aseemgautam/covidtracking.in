import Link from 'next/link';
import { Layout, Space, Row, Col, Menu, Dropdown } from 'antd';
import { MenuOutlined, TwitterOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const tracker = <Link href="/"><a>TRACKER</a></Link>;
const criteria = <Link href="/criteria"><a>CRITERIA</a></Link>;
const analytics = <Link href="/analytics"><a>ANALYTICS</a></Link>;
const menu = (
	<Menu>
		<Menu.Item>
			{tracker}
		</Menu.Item>
		{/* <Menu.Item>
			{analytics}
		</Menu.Item> */}
		<Menu.Item>
			{criteria}
		</Menu.Item>
	</Menu>
);
const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col className="logo" xs={16} sm={18} md={12} lg={8}>
						<a href="/">COVID TRACKING INDIA</a>
					</Col>
					<Col xs={8} sm={6} md={0} className="mobile-navigation">
						<div>
							<a
								style={{ color: '#1DA1F2' }}
								rel="noopener noreferrer"
								target="_blank"
								href="https://twitter.com/CovidTrackingIn"
							>
								<TwitterOutlined />
							</a>
						</div>
						<Dropdown overlay={menu}>
							<MenuOutlined />
						</Dropdown>
					</Col>
					<Col xs={0} sm={0} md={12} lg={16}>
						<Space size="middle" className="navigation">
							{tracker}
							{criteria}
							<div>
								<a
									style={{ color: '#1DA1F2' }}
									rel="noopener noreferrer"
									target="_blank"
									href="https://twitter.com/CovidTrackingIn"
								>
									<TwitterOutlined /> &nbsp;TWITTER
								</a>
							</div>
							{/* {analytics} */}
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
			<Footer>
				<div className="flex-row-center">
					<div className="logo">
						<a href="/">COVID TRACKING INDIA</a>
					</div>
					<div className="btn-twitter">
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="https://twitter.com/CovidTrackingIn"
						>
							<TwitterOutlined /> Follow on twitter
						</a>
					</div>
				</div>
			</Footer>
		</Layout>
	);
};

export default SiteLayout;
