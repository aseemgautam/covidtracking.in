import { useState } from 'react';
import { Row, Col, Radio, Space } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import numeral from 'numeral';
import CovidStatistic from './CovidStatistic';
import DatePicker from '../DatePicker';
import Utils from '../../classes/Utils';

const NationalStats = ({ latest, dailyStatistics }) => {
	const [date, setDate] = useState(latest.date);

	function onDateChangeFromPicker(newDate) {
		if (newDate && dayjs(newDate).isValid()) {
			setDate(newDate.format('YYYY-MM-DD'));
		}
	}
	function onDateChangeFromRadio(e) {
		setDate(e.target.value);
	}
	function disableDate(current) {
		// console.log(current);
		return dayjs(current).isBefore(dayjs('2020-07-01')) || dayjs(current).isAfter(dayjs(latest.date));
	}
	const statistic = date === latest.date ? latest : _.find(dailyStatistics, { date });
	return (
		<>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 16, sm: 16 }]}>
				<Col xs={24}>
					<Space>
						<Radio.Group value={date} onChange={onDateChangeFromRadio}>
							<Radio.Button value={latest.date}>Today</Radio.Button>
							<Radio.Button
								value={_.last(dailyStatistics).date}
							>Yesterday
							</Radio.Button>
						</Radio.Group>
						<DatePicker
							inputReadOnly
							allowClear={false}
							value={dayjs(date)}
							onChange={onDateChangeFromPicker}
							disabledDate={disableDate}
						/>
					</Space>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="confirmed"
						value={statistic.cases}
						suffix={statistic.newCases}
						suffixClassName="red6"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Active"
						className="statistic-active"
						value={statistic.active}
						suffix={statistic.newActive}
						suffixClassName={latest.newActive > 0 ? 'red6' : 'green7'}
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Deaths"
						className="statistic-deaths"
						value={statistic.deaths}
						suffix={statistic.newDeaths}
						suffixClassName="red6"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Recovered"
						className="statistic-recovered"
						value={statistic.recovered}
						suffix={statistic.newRecovered}
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Covid Tests"
						value={numeral(statistic.tests).format('0.00a')}
						suffix={statistic.newTests}
						suffixClassName="green7"
						precision={0}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Daily Positivity Rate"
						value={statistic.dailyPositivity}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Positivity Rate"
						value={statistic.positivity}
						suffix="%"
						precision={2}
					/>
				</Col>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="Death Rate"
						value={statistic.deathRate}
						suffix="%"
						precision={2}
					/>
				</Col>
			</Row>
		</>
	);
};

export default NationalStats;
