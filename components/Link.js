const Link = ({ url, children }) => {
	return (
		<a
			rel="noopener noreferrer"
			target="_blank"
			href={url}
		>
			{children}
		</a>
	);
};

export default Link;
