import { ResponsiveBar } from '@nivo/bar';

const NewCasesChart = () => {
	return (
		<div className="chart">
			<ResponsiveBar
				colors={['#ffc53d', '#f5222d', '#52c41a']}
				padding={0.2}
				labelSkipHeight={10}
				margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
				data={[
					{ date: '23/03', cases: 103, death: 5, recover: 10 },
					{ date: '24/03', cases: 37, death: 5, recover: 10 },
					{ date: '25/03', cases: 121, death: 5, recover: 10 },
					{ date: '26/03', cases: 70, death: 5, recover: 10 },
					{ date: '27/03', cases: 160, death: 5, recover: 10 },
					{ date: '28/03', cases: 100, death: 5, recover: 10 },
					{ date: '29/03', cases: 37, death: 5, recover: 10 },
					{ date: '30/03', cases: 227, death: 5, recover: 10 },
					{ date: '31/03', cases: 146, death: 5, recover: 10 }
				]}
				indexBy="date"
				keys={['cases', 'death', 'recover']}
				axisLeft={null}
				enableGridY={false}
				enableGridX={false}
				labelTextColor="#555"
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'top-left',
						direction: 'row',
						justify: false,
						translateX: 0,
						translateY: 0,
						itemsSpacing: 0,
						itemWidth: 40,
						itemHeight: 10,
						itemDirection: 'top-to-bottom',
						itemOpacity: 0.85,
						symbolSize: 20,
						effects: [
							{
								on: 'hover',
								style: {
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</div>
	);
};

export default NewCasesChart;
