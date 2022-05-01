const siteRoutes = require("./site");
const userRoutes = require("./users");
const deviceRoutes = require("./devices");
const managementRoutes = require("./management");
const notificationRoutes = require("./notification");
const reportRoutes = require("./report");
const fanRoomRoutes = require("./fanRoom");
const lightRoomRoutes = require("./lightRoom");
const api = require("./api/api");
function route(app) {
	app.use("/management", managementRoutes);
	app.use("/notification", notificationRoutes);
	app.use("/fanRoom", fanRoomRoutes);
	app.use("/lightRoom", lightRoomRoutes);
	app.use("/", siteRoutes);
	app.use("/", userRoutes);
	app.use("/", deviceRoutes);
	app.use("/report", reportRoutes);
	app.use("/api", api);
}

module.exports = route;
