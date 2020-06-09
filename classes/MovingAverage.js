/* eslint-disable no-param-reassign */
class MovingAverage {
	calculate = (array, field) => {
		if (Array.isArray(array) && array.length > 0) {
			array.forEach((curr, idx, src) => {
				curr.movingAvg7days = 0;
				curr.movingAvg14days = 0;
				curr.movingAvg7daysRate = 0;
				curr.movingAvg14daysRate = 0;

				if (idx > 7) {
					curr.movingAvg7days = Math.round(src.slice(idx - 7, idx).reduce((prev, current) => {
						return prev + current[field];
					}, 0) / 7);
				}
				if (idx > 14) {
					curr.movingAvg14days = Math.round(src.slice(idx - 14, idx).reduce((prev, current) => {
						return prev + current[field];
					}, 0) / 14);
				}
				if (idx > 14 && src[idx - 7].movingAvg7days) {
					curr.movingAvg7daysRate = Math.round(((src[idx].movingAvg7days - src[idx - 7].movingAvg7days)
						/ (src[idx - 7].movingAvg7days === 0 ? 1 : src[idx - 7].movingAvg7days)) * 100);
				}
				if (idx > 28 && src[idx - 14].movingAvg14days) {
					curr.movingAvg14daysRate = Math.round(((src[idx].movingAvg7days - src[idx - 14].movingAvg7days)
						/ (src[idx - 14].movingAvg7days === 0 ? 1 : src[idx - 14].movingAvg7days)) * 100);
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
