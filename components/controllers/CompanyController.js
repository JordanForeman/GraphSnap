var Company = require('../Company');

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getCompany = function(req, res){
    authCheckMiddleware(req, res);

    Company.findById(req.user.company, function(err, company){
        if(err) return console.log(err);

        res.render('Company/index', {company: company});
    });
};

var getCompanyUsers = function(req, res){
    authCheckMiddleware(req, res);

    Company.findById(req.user.company)
    .populate('users')
    .exec(function(err, company){
        if (err) return next(err);
        res.render('Company/users', {company : company});
    });
};

var getCreateNewUser = function(req, res){
    authCheckMiddleware(req, res);

    Company.findById(req.user.company, function(err, company){
        if (err) return next(err);

        res.render('Company/CreateUser', {company : company});
    });
};

//======================
// Helpers
//======================
var authCheckMiddleware = function(req, res) {
	if (!req.user)
		res.redirect('/');

	if (!req.user.isAdmin)
		res.redirect(req.originalUrl);
};

//======================
// Register Handlers
//======================
router.get('/Company', getCompany);
router.get('/Company/Users', getCompanyUsers);
router.get('/Company/Users/CreateNew', getCreateNewUser);

//======================
// Hook up Middleware
//======================
router.use(require('../middleware/SetupUser'));

module.exports = router;
