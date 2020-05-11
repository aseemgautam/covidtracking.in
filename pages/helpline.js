import Link from 'next/link';
import { Card, List, Typography, Breadcrumb } from 'antd';
import HelpJson from '../public/helpline.json';

const { Text } = Typography;
const national = [
	{
		title: 'TOLL FREE',
		content: '1024'
	},
	{
		title: 'INDIA HELPLINE NUMBER',
		content: '+91-11-23978046'
	},
	{
		title: 'EMAIL',
		content: 'ncov2019@gov.in'
	}
];

const helpline = () => {
	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item><Link href="/"><a>Home</a></Link></Breadcrumb.Item>
				<Breadcrumb.Item>Coronavirus Helpline</Breadcrumb.Item>
			</Breadcrumb>
			<h1>CORONAVIRUS HELPLINE - NATIONAL</h1>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 3,
					md: 3,
					lg: 3,
					xl: 3,
					xxl: 3,
				}}
				dataSource={national}
				renderItem={item => {
					return (
						<List.Item>
							<Card
								size="small"
								className="helpline-card"
								title={item.title}
							>
								<Text copyable>{item.content}</Text>
							</Card>
						</List.Item>
					);
				}}
			/>
			<h1>STATE HELPLINE NUMBERS</h1>
			<List
				className="helpline-list"
				header={(
					<>
						<div>State</div>
						<div>Helpline</div>
					</>
				)}
				dataSource={HelpJson}
				renderItem={
					item => {
						return (
							<List.Item>
								<div>{item.State}</div>
								<Text copyable>{item.Helpline}</Text>
							</List.Item>
						);
					}
				}
			/>
		</>
	);
};

export default helpline;
