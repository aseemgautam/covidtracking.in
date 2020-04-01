import { ResponsiveBar } from '@nivo/bar';

const styles = {
	fontFamily: 'inherit',
	textAlign: 'center',
	height: '300px',
	// width: '100%'
};

const NewCasesChart = () => {
	return (
		<div style={styles}>
			<ResponsiveBar
				colors={['#1890ff']}
				padding={0.35}
				margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
				data={[
					{ date: '23/03', cases: 103 },
					{ date: '24/03', cases: 37 },
					{ date: '25/03', cases: 121 },
					{ date: '26/03', cases: 70 },
					{ date: '27/03', cases: 160 },
					{ date: '28/03', cases: 100 },
					{ date: '29/03', cases: 37 },
					{ date: '30/03', cases: 227 },
					{ date: '31/03', cases: 146 }
				]}
				indexBy="date"
				keys={['cases']}
				axisLeft={false}
				enableGridY={false}
				enableGridX={false}
				labelTextColor="#fff"
			/>
		</div>
	);
};

export default NewCasesChart;
