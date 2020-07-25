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
				if (src[idx - 7]) {
					curr.movingAvg7daysRate = Math.round(((curr.movingAvg7days - src[idx - 7].movingAvg7days)
						/ (src[idx - 7].movingAvg7days ? src[idx - 7].movingAvg7days : 1)) * 100);
				}
				if (src[idx - 14]) {
					curr.movingAvg14daysRate = Math.round(((src[idx].movingAvg7days - src[idx - 14].movingAvg7days)
						/ (src[idx - 14].movingAvg7days ? src[idx - 14].movingAvg7days : 1)) * 100);
				}
			});
		}
	}

	for7days = (array, field, newField) => {
		if (Array.isArray(array) && array.length > 0) {
			array.forEach((curr, idx, src) => {
				curr[newField] = 0;
				if (idx > 7) {
					curr[newField] = Math.round(src.slice(idx - 7, idx).reduce((prev, current) => {
						return prev + current[field];
					}, 0) / 7);
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
