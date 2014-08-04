var api_middleware = function(req, res, next) {
	if (req.method == 'GET') {
		if (!req.query.token) {res.send(403);}
		else {next();}
	}
};

module.exports = function(app) {
	/* Custom Middleware */
	app.use('/api', api_middleware);
};