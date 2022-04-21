var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const route = require("./routes/index");

var passport = require("passport");
var session = require("express-session");
var SiteController = require("./app/controllers/siteController");
var flash = require("connect-flash");

var NotificationController = require("./app/controllers/notificationController");
var report = require("./app/helpers/updateAverage");
// check gas concentration frequently to notify
var notificated = { val: false };
NotificationController.checkGasConcen(notificated);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
var handlerbar = require("./app/helpers/handlebarhelps");
const db = require("./config/db");

db.connect();
report.updateAveAuto();
// view engine setup
app.set("views", path.join(__dirname, "resources/views"));

console.log(__dirname + "/resources/views/layouts");
app.set("view engine", "hbs");
// app.engine('handlebars', hbs.engine);
app.engine(
	"hbs",
	exphbs.engine({
		extname: "hbs",
		defaultView: "default",
		layoutsDir: __dirname + "/resources/views/layouts",
		partialsDir: __dirname + "/resources/views/partials/",
	})
);

app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

// app.use(express.cookieParser());
//app use session to identify each user and information when authenticated to system
app.use(
	session({
		secret: process.env.SECERT_SESSION_KEY,
		resave: true,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

//middleware set variable for all request
app.use((req, res, next) => {
	const apiu = /^[/]api[/](.*?)$/;
	if (req.url.match(apiu)) return next();

	//if url is the same with login ... continue
	if (req.url === "/users/login") return next();

	//check authenticated after per request
	if (!req.isAuthenticated()) {
		return res.redirect("/users/login");
	}

	//set user for all request
	var user = {};
	if (req.user) {
		user = JSON.parse(JSON.stringify(req.user));
		res.locals.user = user;
	}
	res.locals.AIO_KEY = process.env.AIO_KEY;
	next();
});

route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
