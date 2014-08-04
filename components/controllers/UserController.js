var mongoose = require('mongoose'),
	passport = require('passport');

var	User = require("../User");

var router = require('express').Router();

//======================
// GET Handlers
//======================
var getUsers = function(req, res){
	if (!req.user)
		res.redirect('/login');

	User.find({}, function(err, users){
		if (err) {
			console.log(err);
			res.redirect('/');
		} else {
			res.render('users/index', {users: users});
			}
	});
};

var getUserById = function(req, res){
	if (!req.user)
		res.redirect('/login');

	console.log(req.params.id);

	User.findById(req.params.id, function(err, u){
		if (err) {
			console.log(err);
		} else if (!u) {
			console.log('no user with that id');
		} else {
			res.render('users/single', {usr : u});
			return;
		}
	 	
	 	res.redirect('/');
	});
};

var getSettings = function(req, res){
	if (!req.user){
		console.log("not authorized");
		res.redirect("/");
	}

	res.render('users/settings', {user: req.user});
};

//======================
// POST Handlers
//======================
var postSettings = function(req, res){
	if (!req.user)
		res.redirect('/login');
	User.update({_id : req.body.uid}, 
				{
					name: req.body.name,
					email: req.body.email
				}, function(err, numAffected, rawResp){
					if (err) console.log(err);
				});
	res.redirect('/');
};

//======================
// Register Handlers
//======================
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/settings', getSettings);
router.post('/settings', postSettings);

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('../middleware/SetupUser');
router.use(SetupUserMiddleware);

// TODO:
module.exports = router;
