var express        = require('express'),
    morgan         = require('morgan'),
    compression    = require('compression'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    app            = express();

app.use(morgan('dev'));     // logs all requests to the console
app.use(compression());     // compresses response data with gzip/deflate
app.use(methodOverride());  // simulates DELETE and PUT
app.use(bodyParser());      // pulls req.body from html POST
app.set('json spaces', 0);  // remove superfluous spaces from JSON responses

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// serve all asset files from necessary directories
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/partials", express.static(__dirname + "/public/partials"));
app.use("/templates", express.static(__dirname + "/public/templates"));

// any API endpoints go here, declared before 'app.all'

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/public" });
});

app.listen(process.env.PORT || 3000);