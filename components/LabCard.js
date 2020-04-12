/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { Card, Tag, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const LabCard = ({ lab }) => {
	const tag = lab.catid === 15
		? <Tag color="geekblue">Government / Public Lab</Tag> : <Tag color="purple">Private Lab</Tag>;
	const mapLink = `https://www.google.com/maps/search/?api=1&query=${lab.lat},${lab.lng}`;
	return (
		<Card
			className="lab-card"
			title={lab.title}
			size="small"
			extra={<a href={mapLink} target="_blank" rel="noopener noreferrer"><EnvironmentOutlined /></a>}
		>
			<Paragraph copyable>{lab.address}</Paragraph>
			<ul>
				<li>{tag}</li>
			</ul>
		</Card>
	);
};
export default LabCard;
