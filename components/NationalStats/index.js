import { useState } from 'react';
import { Row, Col, Radio, Space } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import numeral from 'numeral';
import CovidStatistic from './CovidStatistic';
import DatePicker from '../DatePicker';

const NationalStats = ({ latest, dailyStatistics, isNational }) => {
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
	// set dates;
	const todayDate = latest.date;
	const yesterdayDate = _.nth(dailyStatistics, isNational === true ? -1 : -2).date;
	const statistic = date === latest.date ? latest : _.find(dailyStatistics, { date });
	let radioTextFirst = 'Today';
	let radioTextSecond = 'Yesterday';
	if (dayjs(latest.date).isBefore(new Date(), 'date') && (new Date()).getHours() > 8) {
		radioTextFirst = 'Yesterday';
		radioTextSecond = '2 days ago';
	}
	return (
		<>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 16, sm: 16 }]}>
				<Col xs={24}>
					<Space>
						<Radio.Group value={date} onChange={onDateChangeFromRadio}>
							<Radio.Button value={todayDate}>{radioTextFirst}</Radio.Button>
							<Radio.Button
								value={yesterdayDate}
							>{radioTextSecond}
							</Radio.Button>
						</Radio.Group>
						<DatePicker
							inputReadOnly
							allowClear={false}
							value={dayjs(date)}
							onChange={onDateChangeFromPicker}
							disabledDate={disableDate}
							showToday={false}
						/>
					</Space>
				</Col>
			</Row>
			<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
				<Col xs={12} sm={8} lg={6}>
					<CovidStatistic
						title="confirmed"
						value={statistic.confirmed}
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
						suffix={statistic.newRecover}
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
