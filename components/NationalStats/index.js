import { Row, Col } from 'antd';
import _ from 'lodash';
import CovidDataIndia from '../../classes/CovidDataIndia';
import CovidStatistic from './CovidStatistic';
import MovingAverageCard from './MovingAverageCard';

const NationalStats = () => {
	const { latest } = CovidDataIndia;
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
						suffixClassName="red6"
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
						value={CovidDataIndia.deathRate}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Recovery Rate"
						value={CovidDataIndia.recoveryRate}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Cases Per 1L"
						value={CovidDataIndia.casesPer1L}
						suffix="VERY LOW"
						suffixClassName="green7"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Covid Tests"
						value={_.last(CovidDataIndia.testing).samples}
						suffix={_.last(CovidDataIndia.testing).newSamples}
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={CovidDataIndia.cases} days={7} />
				</Col>
				<Col xs={24} sm={24} md={12}>
					<MovingAverageCard cases={CovidDataIndia.cases} days={14} />
				</Col>
			</Row>
		</>
	);
};

export default NationalStats;
