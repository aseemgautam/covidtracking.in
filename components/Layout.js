import { Layout, Space, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col xs={1} sm={1} lg={2} xl={4} />
					<Col xs={6} sm={6} lg={6} xl={4}>
						<div className="logo">COVID - 19</div>
					</Col>
					<Col xs={16} sm={16} lg={14} xl={12}>
						{/* <Space size="middle" className="navigation">
						</Space> */}
						<a href="/">Tracker</a>
						<a href="/">News</a>
						<a href="/helpline">Helpline</a>
						<a href="/labs">Labs</a>
					</Col>
					<Col xs={1} sm={1} lg={2} xl={4} />
				</Row>
			</Header>
			<Content>
				<Row>
					<Col xs={1} sm={1} lg={2} xl={4} />
					<Col xs={22} sm={22} lg={20} xl={16}>
						{children}
					</Col>
					<Col xs={1} sm={1} lg={2} xl={4} />
				</Row>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Covid 19 Wiki</Footer>
		</Layout>
	);
};

export default SiteLayout;
