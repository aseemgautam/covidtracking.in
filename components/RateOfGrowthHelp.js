/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Drawer, Progress, List } from 'antd';
import Analytics from '../classes/Analytics';

const RateOfGrowthText = ({ className }) => {
	const [visible, setVisible] = useState(false);
	const data = [
		{ rate: -10,
			title: 'Negative < 0',
			description: `Active cases decreased in the last week. We are 
			on the right path to recovery.`
		},
		{
			rate: 20,
			title: 'Low 0 - 25%',
			description: 'Active cases increased slightly. Nothing to worry much.'
		},
		{
			rate: 40,
			title: 'Moderate 1 26-50%',
			description: `Moderate / Average increase of active cases. Spread is still in control but 
				can go out of hand from here.`
		},
		{
			rate: 65,
			title: 'Moderate 2 51-75%',
			description: `Moderate increase of active cases but on the higher side. We should be 
				little concerned now.`
		},
		{
			rate: 95,
			title: 'High 76-99%',
			description: `Active cases almost doubled in the last 7 days. This could signal 
				rapid increase of spread of covid-19 in the area or state.`
		},
		{
			rate: 110,
			title: 'Very High > 100%',
			description: `Active cases have doubled, trippled or even more in the 
				last 7 days. The spread is now fast & often needs a strict lockdown to control.`
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
			<a onClick={showHelp} className={`${className} link`}>LAST 7 DAYS TREND</a>
			<Drawer
				className="rate-of-growth-drawer"
				title="7 Day Trend - Active Cases"
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
								<div>{item.description}</div>
							</List.Item>
						);
					}}
				/>
			</Drawer>
		</>
	);
};

export default RateOfGrowthText;
