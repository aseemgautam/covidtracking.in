/* eslint-disable no-param-reassign */
class MovingAverage {
	calculate = (array, field) => {
		if (Array.isArray(array) && array.length > 0) {
			array.forEach((curr, idx, src) => {
				curr.movingAvg7days = 0;
				curr.movingAvg7daysRate = 0;
				curr.movingAvg14daysRate = 0;

				if (idx >= 6) {
					curr.movingAvg7days = Math.round(src.slice(idx - 6, idx + 1).reduce((prev, current) => {
						return prev + current[field];
					}, 0) / 7);
					// Everyday new cases field is reset to 0. Until there is an update, 0 new cases will
					// reduce moving average. Copy prev day MA.
					if (idx === (src.length - 1) && curr[field] === 0) {
						curr.movingAvg7days	= src[idx - 1].movingAvg7days;
					}
				}
				if (src[idx - 7]) {
					curr.movingAvg7daysRate = Math.round(((curr.movingAvg7days - src[idx - 7].movingAvg7days)
						/ (src[idx - 7].movingAvg7days ? src[idx - 7].movingAvg7days : 1)) * 100);
				}
				if (src[idx - 20]) { // 21st day
					curr.movingAvg14daysRate = Math.round(((src[idx].movingAvg7days - src[idx - 14].movingAvg7days)
						/ (src[idx - 14].movingAvg7days ? src[idx - 14].movingAvg7days : 1)) * 100);
				}
			});
		}
	}

	for7days = (array, field, newField, round) => {
		if (Array.isArray(array) && array.length > 0) {
			array.forEach((curr, idx, src) => {
				curr[newField] = 0;
				if (idx > 7) {
					const ma = src.slice(idx - 6, idx + 1).reduce((prev, current) => {
						return prev + current[field];
					}, 0) / 7;
					curr[newField] = round ? Math.round(ma) : parseFloat(ma.toFixed(2));
					// New cases, deaths, recovered are 0 until there is a daily update.
					// If 0, copy last days moving average for field.
					if (idx === (src.length - 1) && curr[field] === 0) {
						curr[newField]	= src[idx - 1][newField];
					}
				}
			});
		}
	}

	round = num => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
}

const movingAverage = new MovingAverage();
Object.freeze(movingAverage);

export default movingAverage;
