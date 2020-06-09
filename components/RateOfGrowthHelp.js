/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Drawer, List } from 'antd';
import MovingAverageProgress from './MovingAverageProgress';

const RateOfGrowthText = ({ className, title }) => {
	const [visible, setVisible] = useState(false);
	const data = [
		{
			rate: 60,
			title: 'RED - Rapid Growth',
			growth: '14 Day Rolling Average > 50%. Covid+ cases (daily, average) have increased by 50% in the last 14 days.',
		},
		{
			rate: 40,
			title: 'ORANGE - Moderate Growth',
			// eslint-disable-next-line max-len
			growth: '14 Day Rolling Average 20% - 50%. Covid+ cases (daily, average) have increased by 20-50% in the last 14 days.',
		},
		{
			rate: 20,
			title: 'YELLOW - Low Growth',
			growth: '14 Day Rolling Average 0% - 20%. Covid+ cases (daily, average) have increased by 0-20% in the last 14 days.',
		},
		{ rate: -10,
			title: 'GREEN - Negative Growth',
			growth: '14 Day Rolling Average < 0. Covid+ cases (daily, average) have DECREASED in the last 14 days. This is a downtrend that signals improvement in the State.'
		},
	];
	function showHelp() {
		setVisible(true);
	}
	function onClose() {
		setVisible(false);
	}
	return (
		<>
			<a onClick={showHelp} className={`${className ?? ''} link`}>{title}</a>
			<Drawer
				className="rate-of-growth-drawer"
				title="14 Day Trend of COVID+"
				placement="right"
				closable
				onClose={onClose}
				visible={visible}
				width={360}
			>
				<p>This is the last 14 days of COVID positive cases using a 7 day moving average.
					A rolling average smoothens out the curve by reducing sudden spikes.
				</p>
				<List
					dataSource={data}
					itemLayout="vertical"
					renderItem={item => {
						return (
							<List.Item>
								<List.Item.Meta
									title={(
										<>
											<div>{item.title}</div>
											<MovingAverageProgress rateOfInc={item.rate} />
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
