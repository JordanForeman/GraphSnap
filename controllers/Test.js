var mongoose = require('mongoose'),
    Test = require("../models/Test"),
    DataPoint = require("../models/DataPoint"),
    Profile = require("../models/Profile");

module.exports = function(app){

    app.get('/Tests', function(req, res){
        if (!req.user) res.redirect('/');

        Test.find({})
        .populate('profile')
        .exec(function(err, tests){
            if (err) return console.log(err);

            console.log(tests[0].profile);

            res.render('Test/index', {tests: tests});
        });
    });

    app.get('/Test/:id', function(req, res){
        if (!req.user) res.redirect('/');

        Test.findById(req.params.id)
        .populate('profile')
        .exec(function(err, test){
            if (err) return console.log(err);

            res.render('Test/single', {test: test});
        });
    });

    app.get('/Test/CreateNew', function(req, res){
        if (!req.user) res.redirect('/');

        Profile.find({}, function(err, profiles){
            if (err) return console.log(err);

            res.render('Test/create', {profiles: profiles});
        });
    });

    app.get('/Test/CreateNew/:id', function(req, res){
        if (!req.user) res.redirect('/');

        Profile.findById(req.params.id, function(err, profile){
            res.render('Test/create', {profile: profile});
        });

    });

    app.post('/Test/CreateNew', function(req, res){
        if (!req.user) res.redirect('/');

        var test = new Test;
        test.company = req.user.company;
        test.profile = req.body.profileId;
        test.name = req.body.name;
        test.threshold.min = req.body.minvalue;
        test.threshold.max = req.body.maxvalue;

        Profile.findById(req.body.profileId, function(err, profile){
            if (err) return console.log(err);

            profile.tests.push(test._id);

            test.save(function(err){if(err)console.log(err);});
            profile.save(function(err){if(err)console.log(err);});
        });

        res.redirect('/Tests');
    });

};
