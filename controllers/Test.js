var mongoose = require('mongoose'),
    Test = require("../models/Test"),
    DataPoint = require("../models/DataPoint"),
    Profile = require("../models/Profile");

module.exports = function(app){

    app.get('/Tests', function(req, res){
        if (!req.user) res.redirect('/');
        Test.find()
        .populate('profile')
        .exec(function(err, tests) {
            if (err) return console.log(err);
            res.render('Test/index', {tests: tests});
        });
    });

    app.get('/Test/CreateNew', function(req, res){
        if (!req.user) res.redirect('/login');

        var companyId = req.user.company;
        console.log(companyId);

        Profile.find({company: companyId}).exec(function(err, profiles){

            if (err) { return console.log(err); }

            console.log("Profiles: " + profiles.length);
            res.render('Test/create', {profiles: profiles});

        });
    });

    app.get('/Test/CreateNew/:id', function(req, res){
        if (!req.user) res.redirect('/login');

        var profileId = req.params.id;

        Profile.findById(profileId).exec(function(err, profile){
            if (err) return console.log(err);

            res.render('Test/create', {singleProfile: true, profile: profile});
        });
    });

    app.post('/Test/CreateNew', function(req, res){
        if (!req.user) res.redirect('/');

        var company = req.user.company || req.user.getCompany._id;
        //console.log(company);

        var test = new Test();
        test.company = company;
        test.profile = req.body.profileId;
        test.name = req.body.name;

        var type = req.body.testType;
        test.type = type;

        if (type == "QUANTITATIVE") {
            test.isQuantitative = true;
            test.isQualitative = false;
            test.threshold.min = req.body.minvalue;
            test.threshold.max = req.body.maxvalue;
            test.units = req.body.units;
        } else if (type == "QUALITATIVE") {
            test.isQuantitative = false;
            test.isQuantitative = true;
        } else {
            //TODO: wtf happened here
        }

        Profile.findById(req.body.profileId, function(err, profile){
            if (err) return console.log(err);

            if (!profile) return console.log("No Profile Found");

            profile.tests.push(test._id);

            test.save(function(err){if(err)console.log(err);});
            profile.save(function(err){if(err)console.log(err);});
        });

        res.redirect('/Tests');
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

    app.get('/Test/Profile/:id', function(req, res){
        if (!req.user) res.redirect('/');

        Test.find({profile: req.params.id})
        .populate('profile')
        .exec(function(err, tests){
            if (err) return console.log(err);

            res.render('Test/index', {tests: tests, isSingle: true, profileId: req.params.id});
        });
    });

};
