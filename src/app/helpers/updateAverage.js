const ReportController = require("../controllers/reportController");
const userController = require("../controllers/userController");
require("dotenv").config();
let curDate = new Date();
let hours = curDate.getHours();
let minutes = curDate.getMinutes();
let seconds = curDate.getSeconds();
updateAveAuto = () => {
	console.log(process.env.HOUR, process.env.MINUTE, process.env.SECOND);
	console.log(hours, minutes, seconds);
	console.log(
		getMilisicon(
			parseInt(process.env.HOUR),
			parseInt(process.env.MINUTE),
			parseInt(process.env.SECOND)
		) -
			getMilisicon(
				(hours + parseInt(process.env.UTC_HOUR)) % 24,
				minutes,
				seconds
			)
	);
	setTimeout(
		timeoutUpdate,
		getMilisicon(
			parseInt(process.env.HOUR),
			parseInt(process.env.MINUTE),
			parseInt(process.env.SECOND)
		) -
			getMilisicon(
				(hours + parseInt(process.env.UTC_HOUR)) % 24,
				minutes,
				seconds
			)
	);
};

function timeoutUpdate() {
	updateAve();
	setTimeout(timeoutUpdate, getMilisicon(23, 59, 59));
}

function updateAve() {
	ReportController.addAverage(
		getDate(new Date()) + "T00:00:00Z",
		getDate(new Date()) + "T23:59:59Z"
	);
}

getMilisicon = (hours, minutes, seconds) =>
	(hours * 3600 + minutes * 60 + seconds) * 1000;

getDate = (dateTime) => {
	let date = ("0" + dateTime.getDate()).slice(-2);
	// current month
	let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
	return dateTime.getFullYear() + "-" + month + "-" + date;
};

// ReportController.addAverage();
module.exports = {updateAveAuto};
