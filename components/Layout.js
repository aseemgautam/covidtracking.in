import Link from 'next/link';
import { Layout, Space, Row, Col, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined, TwitterOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const tracker = <Link href="/"><a>TRACKER</a></Link>;
const analytics = <Link href="/analytics"><a>ANALYTICS</a></Link>;
const helpline = <Link href="/helpline"><a>HELPLINES</a></Link>;
const testing = <Link href="/coronavirus-testing-labs"><a>TESTING</a></Link>;
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
					<Col className="logo" xs={20} sm={18} md={12} lg={8}>
						<a href="/">COVID TRACKING PROJECT</a>
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
							{helpline}
							{testing}
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
			{/* <Footer style={{ textAlign: 'center' }}>
				<Row>
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
						<div className="btn-twitter">
							<a
								rel="noopener noreferrer"
								target="_blank"
								href="https://twitter.com/cvd19in"
							>
								<TwitterOutlined /> Follow on twitter
							</a>
						</div>
						<div>Developed By
							<a
								href="https://www.linkedin.com/in/aseemgautam/"
								rel="noopener noreferrer"
								target="_blank"
							> Aseem Gautam
							</a>
						</div>
					</Col>
				</Row>
			</Footer> */}
		</Layout>
	);
};

export default SiteLayout;
