import Link from 'next/link';
import { Layout, Space, Row, Col, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined, TwitterOutlined } from '@ant-design/icons';
import StateDropdown from './layout/StateDropdown';

const { Header, Content, Footer } = Layout;
const tracker = <Link href="/"><a>TRACKER</a></Link>;
const criteria = <Link href="/criteria"><a>CRITERIA</a></Link>;
const testing = <Link href="/testing"><a>TESTING</a></Link>;
const districts = <Link href="/districts"><a>DISTRICTS</a></Link>;
const menu = (
	<Menu>
		<Menu.Item>
			{tracker}
		</Menu.Item>
		{/* <Menu.Item>
			{districts}
		</Menu.Item>
		<Menu.Item>
			{testing}
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
					<Col className="logo" xs={16} sm={18} md={8} lg={6}>
						<a href="/">COVID TRACKING INDIA</a>
					</Col>
					<Col xs={8} sm={6} md={0} className="mobile-navigation">
						<Space>
							<div className="twitter" style={{ marginRight: '4px' }}>
								<a
									style={{ color: '#1DA1F2' }}
									rel="noopener noreferrer"
									target="_blank"
									href="https://twitter.com/CovidTrackingIn"
								>
									<TwitterOutlined />
								</a>
							</div>
							<StateDropdown />
							<Dropdown overlay={menu}>
								<Button>
									<MenuOutlined />
								</Button>
							</Dropdown>
						</Space>
					</Col>
					<Col xs={0} sm={0} md={16} lg={18}>
						<Space size="middle" className="navigation">
							{tracker}
							{/* {districts}
							{testing} */}
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
							<StateDropdown />
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
					<div>
						<a href="/">Tracker</a>
					</div>
					{/* <div>
						<a href="/districts">Districts</a>
					</div>
					<div>
						<a href="/testing">Testing</a>
					</div> */}
					<div>
						<a href="/sitemap">Sitemap</a>
					</div>
				</div>
			</Footer>
		</Layout>
	);
};

export default SiteLayout;
