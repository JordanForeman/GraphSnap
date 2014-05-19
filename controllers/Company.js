var Company = require('../models/Company');

var authCheckMiddleware = function(req, res) {
	if (!req.user)
		res.redirect('/');

	if (!req.user.isAdmin)
		res.redirect(req.originalUrl);
};

module.exports = function(app) {

    app.get('/Company', function(req, res){
        authCheckMiddleware(req, res);

        Company.findById(req.user.company, function(err, company){
            if(err) return console.log(err);

            res.render('Company/index', {company: company});
        });
    });

    app.get('/Company/Users', function(req, res){
    	authCheckMiddleware(req, res);

    	Company.findById(req.user.company)
    	.populate('users')
    	.exec(function(err, company){
    		if (err) return next(err);
    		res.render('Company/users', {company : company});
    	});
    });

    app.get('/Company/Users/CreateNew', function(req, res){
    	authCheckMiddleware(req, res);

    	Company.findById(req.user.company, function(err, company){
    		if (err) return next(err);

    		res.render('Company/CreateUser', {company : company});
    	});
    });

};
