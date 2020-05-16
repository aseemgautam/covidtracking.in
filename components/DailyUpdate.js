/* eslint-disable max-len */
import { List } from 'antd';
import { LikeTwoTone, DislikeTwoTone, InfoCircleTwoTone,
	WarningTwoTone } from '@ant-design/icons';

const DailyUpdate = props => {
	const { date, updates } = props;
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const dateString = (new Date(date)).toLocaleDateString('en-us', options);
	function getIcon(type) {
		if (type === 'up') return <LikeTwoTone twoToneColor="#52c41a" />;
		if (type === 'down') return <DislikeTwoTone twoToneColor="#f5222d" />;
		if (type === 'warn') return <WarningTwoTone twoToneColor="#f5222d" />;
		return <InfoCircleTwoTone twoToneColor="#1890ff" />;
	}
	return (
		<List
			header={<h4>{`TODAY'S UPDATE (${dateString})`}</h4>}
			className="daily-update-list"
			itemLayout="horizontal"
			size="small"
			bordered
			dataSource={updates}
			renderItem={item => {
				return (
					<List.Item>
						{getIcon(item.type)} {item.text}
					</List.Item>
				);
			}}
		/>
	);
};

export default DailyUpdate;
