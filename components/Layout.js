import { Layout, Space, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col xs={1} sm={1} lg={2} xl={3} />
					<Col className="logo" xs={18} sm={8} lg={6} xl={6}>
						<img src="/india.png" alt="india" />
						<a href="/">Coronavirus India</a>
					</Col>
					<Col xs={4} sm={0} className="mobile-navigation"><MenuOutlined /></Col>
					<Col xs={0} sm={14} lg={14} xl={12}>
						<Space size="middle" className="navigation">
							<a href="/">Tracker</a>
							<a href="/helpline">Helpline</a>
							<a href="/coronavirus-test-india">Testing</a>
						</Space>
					</Col>
					<Col xs={1} sm={1} lg={2} xl={3} />
				</Row>
			</Header>
			<Content>
				<Row>
					<Col xs={1} sm={1} lg={2} xl={3} />
					<Col xs={22} sm={22} lg={20} xl={18}>
						{children}
					</Col>
					<Col xs={1} sm={1} lg={2} xl={3} />
				</Row>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Covid 19 Wiki</Footer>
		</Layout>
	);
};

export default SiteLayout;
