var express = require('express'),
    app = express();

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.set('json spaces', 0);

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
});

app.listen(process.env.PORT || 3000);