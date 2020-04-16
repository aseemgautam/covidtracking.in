const Trend = Object.freeze({
	UP: Symbol('up'),
	DOWN: Symbol('down'),
	STABLE: Symbol('stable')
});

const GetTrend = value => {
	return value > 0 ? Trend.UP : Trend.DOWN;
};

export default GetTrend;
