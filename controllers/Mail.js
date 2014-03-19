var Sendgrid = require('sendgrid')("JordanForemanBBT", "Gr@ph5n@p!");

module.exports = function(app){

	app.post("/Contact", function(req, res){

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

	});

};