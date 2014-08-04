var Sendgrid = require('sendgrid')("JordanForemanBBT", "Gr@ph5n@p!");

var router = require('express').Router();

//======================
// GET Handlers
//======================
//======================
// POST Handlers
//======================
var postContact = function(req, res){

	var payload = {
		to : "jordan.foreman@biobactrac.com",
		from : req.body.from,
		subject : "New Message from GraphSnap contact Form",
		text : req.body.msg
	};

	console.log(payload);

	sendgrid.send(payload, function(err, json){
		if (err) return console.log(err);

		console.log(json);
	});

};
//======================
// Register Handlers
//======================
router.post('/Contact', postContact);

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('../middleware/SetupUser');
router.use(SetupUserMiddleware);

module.exports = router;