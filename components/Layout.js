import { Layout, Space, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;

const SiteLayout = props => {
	const { children } = props;
	return (
		<Layout className="layout">
			<Header>
				<Row>
					<Col xs={1} sm={1} lg={2} xl={3} />
					<Col className="logo" xs={6} sm={6} lg={6} xl={6}>
						<img src="/india.png" alt="india" />
						<span>COVID -19</span>
					</Col>
					<Col xs={16} sm={16} lg={14} xl={12}>
						<Space size="middle" className="navigation">
							<a href="/">Tracker</a>
							<a href="/">Knowledge</a>
							<a href="/helpline">Helpline</a>
							<a href="/labs">Labs</a>
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
