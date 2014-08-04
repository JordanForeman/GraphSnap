var	passport = require('passport'),
	jwt = require('jwt-simple');

var	Company = require("../Company"),
	User = require("../User");

var	config = require('../../config')();
//	Emailer = require("../../helpers/Emailer");

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getLogin = function(req, res) {
	res.render('login', {layout: 'landing'});
};

var getRegister = function(req, res){

	if (config.mode === 'production')
		return res.render('email-signup', { title: 'Subscribe for Updates', layout: 'landing'});

	res.render('register', { title: 'Register', layout: 'landing' });
};

var getLogout = function(req, res){
	req.logout();
	res.redirect('/');
};

//======================
// POST Handlers
//======================
var postLogin = function(req, res){

	if (req.user)
		req.user.token = jwt.encode({email: req.user.email}, config.secret);

    res.redirect('/');
};

// var postRegister = function(req, res){

// 	var companyId = req.body.companyId || null,
// 		company = null,
// 		loginAfter = true; 

// 	console.log(companyId);

// 	if (companyId == null) {
// 		company = new Company(req.body.company);
// 		company.tier = 'basic';
// 		companyId = company.id;
// 	} else {
// 		loginAfter = false;
// 	}

// 	var password = req.body.password || 'abcd1234'; //TODO: actually generate a password
// 	console.log(company);
// 	User.register(new User({ email: req.body.email, company: companyId, name: req.body.name, apiKey: key }), password, function(err, account){
// 		if (err) {
// 			console.log('error registering');
// 			console.log(err);
// 			return res.render('register', {account: account});
// 		}

// 		if (company) {
// 			company.users.push(account);
// 			company.save();
// 		} else {
// 			Company.findById(companyId, function(err, company){
// 				if (err) return console.log(err);
// 				company.users.push(account);
// 				company.save();
// 			});
// 		}

// 		if (loginAfter)
// 			req.login(account);

// 		var email = new Emailer(
// 			account.email,
// 			"Welcome to GraphSnap!",
// 			"<h2>Welcome to GraphSnap!<h2>" +
// 			"<p>You can login here. Your temporary password is: " + password + ". Please update your password from your account settings once you've logged in.</p>" +
// 			"<p>~ The GraphSnap Team</p>"
// 		);
// 		email.send(function(error, success){
// 			if(error) {
// 				console.error("Unable to send via postmark: " + error.message);
// 				return;
// 			}

// 			console.info("Sent to postmark for delivery")
// 		});

// 		account.save();
// 		res.redirect('/');
// 	});

// };

//======================
// Register Handlers
//======================
router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/login'
}), postLogin);
router.post('/register', passport.authenticate('local-register', {
	successRedirect: '/',
	failureRedirect: '/'
}));
router.get('/logout', getLogout);

module.exports = router;
