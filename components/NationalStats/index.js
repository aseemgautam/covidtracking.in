import { Row, Col } from 'antd';
import _ from 'lodash';
import numeral from 'numeral';
import CovidStatistic from './CovidStatistic';

const NationalStats = ({ testingData, covidDataIndia, cases, recovered, deaths, active }) => {
	const { latest } = covidDataIndia;
	const positivityRate = (_.last(testingData).positive) / _.last(testingData).samples;
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
						now={cases}
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
						now={active}
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
						now={deaths}
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
						now={recovered}
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
						title="Positivity Rate"
						value={numeral(positivityRate).format('0.00%')}
						suffix="DOWN"
						suffixClassName="green7"
						precision={2}
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
