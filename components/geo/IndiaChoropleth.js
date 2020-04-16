/* eslint-disable no-restricted-syntax */
import { Choropleth } from '@nivo/geo';
import IndiaStatesGeo from '../../public/IndiaStatesGeo';
import Analytics from '../../classes/Analytics';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const IndiaChoropleth = () => {
	const cases = [];
	for (const key in Analytics.casesByState) {
		if (Object.prototype.hasOwnProperty.call(Analytics.casesByState, key)
			&& Array.isArray(Analytics.casesByState[key])) {
			const stateCase = Analytics.casesByState[key].pop();
			cases.push({ id: stateCase.state, value: stateCase.active });
		}
	}

	return (
		<Choropleth
			height={400}
			width={340}
			data={cases}
			features={IndiaStatesGeo.features}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			colors={['#fff1f0', '#ffa39e', '#ff4d4f', '#cf1322', '#820014']}
			domain={[0, 2500]}
			unknownColor="#fff"
			// label="Cases"
			valueFormat=".0s"
			projectionTranslation={[-2.25, 1.15]} // 100 scale = -0.4, +0.1, 1 = -.004, +.001
			// projectionTranslation={[-1.91, 1.18]}
			projectionRotation={[0, 0, 0]}
			projectionScale={650}
			borderWidth={1}
			borderColor="#666"
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					justify: true,
					translateX: -20,
					translateY: -20,
					itemsSpacing: 0,
					itemWidth: 74,
					itemHeight: 18,
					itemDirection: 'left-to-right',
					itemTextColor: '#444444',
					itemOpacity: 0.85,
					symbolSize: 16,
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000000',
								itemOpacity: 1
							}
						}
					]
				},
				{
					data: [{
						id: 'conf',
						color: 'transparent',
						label: 'Confirmed Cases' }
					],
					anchor: 'bottom-right',
					direction: 'column',
					translateY: -150,
					itemTextColor: '#444444',
					itemWidth: 130,
					itemHeight: 20,
					itemDirection: 'left-to-right',
					// symbolSize: 20
				}
			]}
		/>
	);
};

export default IndiaChoropleth;
