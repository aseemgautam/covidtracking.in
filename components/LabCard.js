/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { Card, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const LabCard = ({ lab }) => {
	const tag = lab.catid === 15
		? <Tag color="blue">Government / Public Lab</Tag> : <Tag color="purple">Private Lab</Tag>;
	const mapLink = `https://www.google.com/maps/search/?api=1&query=${lab.lat},${lab.lng}`;
	return (
		<Card
			className="lab-card"
			title={lab.title}
			size="small"
			extra={<a href={mapLink} target="_blank" rel="noopener noreferrer"><EnvironmentOutlined /></a>}
		>
			<div>{lab.address}</div>
			<ul>
				<li>{tag}</li>
			</ul>
		</Card>
	);
};
// <a href={mapLink} target="_blank" rel="noopener noreferrer">Google Map</a>
export default LabCard;
