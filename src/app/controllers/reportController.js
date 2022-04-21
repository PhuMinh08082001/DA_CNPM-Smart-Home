const Report = require("../models/reportModel");
var fetch = require("node-fetch");
const {multipleMongooseToObject} = require("../../util/mongoose");
class reportController {
	temparature(req, res, next) {
		Report.find({}).then((temp) => {
			// res.status(200).json(humi);
			res.render("report/report_temparature", {
				temp: multipleMongooseToObject(temp).splice(0, 7),
			});
		});
	}
	humidity(req, res, next) {
		Report.find({}).then((humi) => {
			// res.status(200).json(humi);
			res.render("report/report_humidity", {
				humi: multipleMongooseToObject(humi).splice(0, 7),
			});
		});
	}

	addReport(temperature, humidity) {
		let newReport = new Report({
			temperature: temperature,
			humidity: humidity,
		});
		console.log(newReport);

		newReport
			.save()
			.then()
			.catch((e) => {
				console.log(e);
			});
	}

	// async getReportWeek() {
	//     var listReport;
	//     await Report.find({})
	//         .limit(7)
	//         .then((report) => {
	//             listReport = report;
	//         });
	//     return listReport;
	// }

	async getAverage(name, startDay, endDay) {
		var result;
		await fetch(
			`https://io.adafruit.com/api/v2/DAFS/feeds/${name}/data?start_time=${startDay}&end_time=${endDay}`,
			{
				method: "GET", // or 'PUT'
			}
		)
			.then((response) => response.json())
			.then((data) => {
				let sum = 0;
				for (const i in data) {
					sum += parseInt(data[i].value);
				}
				result = sum / Object.keys(data).length;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		return result;
	}

	async addAverage(startDay, endDay) {
		var temAvg = await this.getAverage("temp", startDay, endDay);
		var humiAvg = await this.getAverage("humi", startDay, endDay);
		if (isNaN(temAvg) || isNaN(humiAvg)) {
			temAvg = Math.floor(Math.random() * (46 - 15)) + 15;
			humiAvg = Math.floor(Math.random() * (60 - 15)) + 15;
		}
		this.addReport(temAvg, humiAvg);
	}

	addTestReport(temAvg, humiAvg) {
		this.addReport(temAvg, humiAvg);
	}
}

module.exports = new reportController();
