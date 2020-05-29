/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Drawer, Progress, List } from 'antd';
import Analytics from '../classes/Analytics';

const RateOfGrowthText = ({ className, title }) => {
	const [visible, setVisible] = useState(false);
	const data = [
		{ rate: -10,
			title: 'TRENDING BETTER',
			growth: '(< 0)',
			description: `Active cases decreased in the last week. We are 
			on the right path to recovery.`
		},
		{
			rate: 20,
			title: 'LOW RATE OF COVID+',
			growth: '(0 - 20%)',
			description: 'Active cases increased slightly. Nothing to worry much.'
		},
		{
			rate: 40,
			title: 'MODERATE RATE OF COVID+',
			growth: '(20% - 50%)',
			description: `Active cases almost doubled in the last 7 days. This could signal 
				rapid increase of spread of covid-19 in the area or state.`
		},
		{
			rate: 75,
			title: 'HIGH RATE OF COVID+',
			growth: '(50% - 99%)',
			description: `Active cases almost doubled in the last 7 days. This could signal 
				rapid increase of spread of covid-19 in the area or state.`
		},
		{
			rate: 110,
			title: 'VERY HIGH RATE OF COVID+',
			growth: '(> 100%)',
			description: `Active cases almost doubled in the last 7 days. This could signal 
				rapid increase of spread of covid-19 in the area or state.`
		}
	];
	function showHelp() {
		setVisible(true);
	}
	function onClose() {
		setVisible(false);
	}
	return (
		<>
			<a onClick={showHelp} className={`${className} link`}>{title}</a>
			<Drawer
				className="rate-of-growth-drawer"
				title="14 Day Moving Average of COVID+"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
				width={360}
			>
				<p>Overall % increase of active cases in the last 7 days.
					Most important metric to understand spread of coronavirus.
				</p>
				<List
					dataSource={data}
					itemLayout="vertical"
					renderItem={item => {
						const progressSettings = Analytics.getProgressColorAndPercent(item.rate);
						return (
							<List.Item>
								<List.Item.Meta
									title={(
										<>
											<div>{item.title}</div>
											<Progress
												percent={progressSettings.percent}
												showInfo={false}
												status="normal"
												steps={4}
												strokeColor={progressSettings.color}
											/>
										</>
									)}
								/>
								<div>{item.growth}</div>
								{/* <div>{item.description}</div> */}
							</List.Item>
						);
					}}
				/>
			</Drawer>
		</>
	);
};

export default RateOfGrowthText;
