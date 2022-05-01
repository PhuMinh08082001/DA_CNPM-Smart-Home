class DeviceRoomController {
	fanroom(req, res, next) {
		res.render("deviceRoom/fanRoom");
	}
	lightroom(req, res, next) {
		res.render("deviceRoom/lightRoom");
	}
}

module.exports = new DeviceRoomController();
