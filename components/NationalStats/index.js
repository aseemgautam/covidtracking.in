import { Row, Col } from 'antd';
import _ from 'lodash';
import numeral from 'numeral';
import CovidStatistic from './CovidStatistic';

const NationalStats = ({ testingData, covidDataIndia }) => {
	const { latest } = covidDataIndia;
	return (
		<>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="confirmed"
						value={latest.confirmed}
						suffix={latest.newCases}
						suffixClassName="red6"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Active"
						className="statistic-active"
						value={latest.active}
						suffix={latest.newActive}
						suffixClassName={latest.newActive > 0 ? 'red6' : 'green7'}
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Deaths"
						className="statistic-deaths"
						value={latest.deaths}
						suffix={latest.newDeaths}
						suffixClassName="red6"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Recovered"
						className="statistic-recovered"
						value={latest.recovered}
						suffix={latest.newRecover}
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Death Rate"
						value={covidDataIndia.deathRate}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Recovery Rate"
						value={covidDataIndia.recoveryRate}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Cases Per Million"
						value={covidDataIndia.casesPer1L}
						suffix="LOW"
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Covid Tests"
						value={numeral(_.last(testingData).samples).format('0.00a')}
						suffix={_.last(testingData).newSamples}
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
			</Row>
		</>
	);
};

export default NationalStats;
