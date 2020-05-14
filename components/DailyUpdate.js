/* eslint-disable max-len */
import { List } from 'antd';
import { LikeTwoTone, DislikeTwoTone, InfoCircleTwoTone } from '@ant-design/icons';

const DailyUpdate = props => {
	const { updates } = props;
	function getIcon(type) {
		if (type === 'up') return <LikeTwoTone twoToneColor="#52c41a" />;
		if (type === 'down') return <DislikeTwoTone twoToneColor="#f5222d" />;
		return <InfoCircleTwoTone twoToneColor="#1890ff" />;
	}
	return (
		<List
			className="daily-update-list"
			itemLayout="horizontal"
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
