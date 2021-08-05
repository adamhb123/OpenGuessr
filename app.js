//  various dev-defined globals
const MAX_UPLOAD_SIZE = "25mb";

// module imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");

const indexRouter = require("./routes/index");
const createRouter = require("./routes/upload");
const editorRouter = require("./routes/editor");
const portalsRouter = require("./routes/portals");
const mapsRouter = require("./routes/maps");
const playRouter = require("./routes/play");

const compression = require("compression");

const app = express();
// view engine setup (ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//  various setup commands
app.use(busboy());
app.use(busboyBodyParser({limit: MAX_UPLOAD_SIZE}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());

//  set static folder
app.use(express.static(path.join(__dirname, "public")));

//  setup routes
app.use("/", indexRouter);
app.use("/upload", createRouter);
app.use("/editor", editorRouter);
app.use("/portals", portalsRouter);
app.use("/maps", mapsRouter);
app.use("/play", playRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
