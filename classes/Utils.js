class Utils {
	getOrdinalNum = number => {
		let selector;

		if (number <= 0) {
			selector = 4;
		} else if ((number > 3 && number < 21) || number % 10 > 3) {
			selector = 0;
		} else {
			selector = number % 10;
		}

		return number + ['th', 'st', 'nd', 'rd', ''][selector];
	};

	dateAndTime = () => {
		const day = this.getOrdinalNum((new Date()).getDate());
		const month = (new Date()).toLocaleString('default', { month: 'long' });
		return `${day} ${month}, ${this.getAMPM()}`;
	}

	getAMPM = () => {
		const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
		let hours = date.getHours();
		let minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours %= 12;
		hours = hours || 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		const strTime = `${hours}:${minutes} ${ampm}`;
		return strTime;
	}
}

const utils = new Utils();
Object.freeze(utils);

export default utils;
