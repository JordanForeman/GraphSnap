var mongoose = require('mongoose'),
	ProductProfile = require("../models/ProductProfile");

// TODO:
module.exports = function(app){

	app.get('/ProductProfiles', function(req, res){
		var users = req.db.collection('productprofiles').find();
		if (!users) {
			console.log("no users found");
			res.redirect('/');
		} else {
			res.render('users/index', {users : users});
		}
	});

	app.get('/ProductProfile/:id', function(req, res){
		var pid = mongoose.Types.ObjectId(req.params.id);
		var prod = ProductProfile.findById(req.params.id);
		if (!u) {
			console.log('no ProductProfile with that id');
		} else {
			res.render('ProductProfile/single', {profile : prod});
		}
	});

	app.get('/ProductProfile/create' function(req, res){
		var profile = new ProductProfile;
		//TODO: give product profile information
		profile.save(function(err){
			
		})
	});

};
