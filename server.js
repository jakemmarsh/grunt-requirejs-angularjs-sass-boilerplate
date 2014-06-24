var express        = require('express'),
    morgan         = require('morgan'),
    compression    = require('compression'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    app            = express();

app.use(morgan('dev'));     // logs all requests to the console
app.use(compression());     // compresses response data with gzip/deflate
app.use(methodOverride());  // simulates DELETE and PUT
app.use(bodyParser.json()); // parses req.body json from html POST
app.use(bodyParser.urlencoded({
    extended: true
}));                        // parses urlencoded req.body, including extended syntax
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
app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use(express.static(__dirname + '/app'));

// any API endpoints go here, declared before 'app.all'

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/app" });
});

app.listen(process.env.PORT || 3000);