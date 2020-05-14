/* eslint-disable max-len */
import Link from 'next/link';
import Head from 'next/head';

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
			<Head>
				<title>Covid-19 State & National Helpline Contact Numbers, India</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta property="og:title" content="Covid-19 State & National Helpline Contact Numbers, India" key="title" />
				<meta property="og:description" content="List of all covid-19 helpline numbers in India." key="description" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://cvd19.in/helpline" />
				<meta property="og:image" content="/cvd-og.png" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Breadcrumb>
				<Breadcrumb.Item><Link href="/"><a>Home</a></Link></Breadcrumb.Item>
				<Breadcrumb.Item>Coronavirus Helpline</Breadcrumb.Item>
			</Breadcrumb>
			<h1>CORONAVIRUS (Covid-19) HELPLINE - NATIONAL</h1>
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
