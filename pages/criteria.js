import Head from 'next/head';
import TrendInfoCards from '../components/TrendInfoCards';
import LineChartSmall from '../components/charts/LineChartSmall';

const Criteria = () => {
	let colSpan = 6;
	let isMobile = false;
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth < 576;
		colSpan = window.innerWidth < 576 ? 12 : 6;
	}
	return (
		<>
			<Head>
				<title>Covid-19 Tracking Criteria</title>
			</Head>
			<div className="criteria">
				<h2 className="title">THE CRITERIA</h2>
				<LineChartSmall />
				<p>
					It is hard to track epidemics. We have never had one in modern times. Are daily ups & downs or news updates
					the right way to track an epidemic? Most probably no. We need a more scientific approach.
					<b> United States</b>, the most affected country, came up with data driven conditions / gating criteria that each
					state should satisfy before proceeding to a phased opening.&nbsp;
				</p>
				<p>
					<a
						rel="noopener noreferrer"
						href="https://www.whitehouse.gov/openingamerica/#criteria"
						target="_blank"
					>
						https://www.whitehouse.gov/openingamerica/
					</a>
				</p>
				<h3 className="title">Downward trajectory of documented cases within a 14-day period</h3>
				<h3>OR</h3>
				<h3 className="title">Downward trajectory of positive tests as a percent of total tests within a 14-day period (flat
					or increasing volume of tests)
				</h3>
				<p>
					To calculate movement or trajectory of positive cases, a <b>rolling (or moving) average</b> method is used.
					A 5-day moving average is the 5-day sum of new covid+ cases divided by 5.
					Moving averages are commonly used in technical analysis of stock prices. They help smooth out
					the price data by creating a constantly updated average price.
				</p>
				<p>Based on the above criteria, we have developed 7 & 14 day trends of new covid+ cases for every state.</p>
				<h3 className="title">What is a 14 Day Trend of COVID+?</h3>
				<p>
					Growth of average daily covid+ cases in the last 14 days. How many more (or less) covid+
					cases occurring today compared to 14 days ago.
				</p>
				<p>
					<img
						style={{ height: isMobile ? '48px' : '64px' }}
						className="trend-image"
						src="/trendformula.png"
						alt="trend formula"
					/>
				</p>
				<p>
					This gives us the trajectory of covid+ cases in the last 14 days. Example below, 14 days ago there were
					an average 9212 covid+ cases daily. Today on average there are 10334 new covid+ cases daily. Today, on average
					we find 15% more covid+ cases.
				</p>
				<p>
					<img
						style={{ height: isMobile ? '164px' : '212px' }}
						className="trend-image"
						src="/trendexplained.png"
						alt="trend explained"
					/>
				</p>
				<p>
					Based on the trend value, every state is put in a simple red, orange, yellow, green scale.
				</p>
				<TrendInfoCards colSpan={colSpan} />
			</div>
		</>
	);
};

export default Criteria;
