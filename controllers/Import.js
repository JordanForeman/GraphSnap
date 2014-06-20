var mongoose 	= require('mongoose'),
	xlsx 		= require('node-xlsx'),
	fs 			= require('fs'),
	DataPoint	= require('../models/DataPoint');

module.exports = function(app){

	app.get('/import', function(req, res){
		// if (!req.user)
		// 	res.redirect('/');

		res.render('Import/index');
	});

	app.post('/import', function(req, res){
		// if (!req.user)
		// 	res.redirect('/');

		var path = req.files.dataSrc.path,
			fname = req.files.dataSrc.name,
			size = req.files.dataSrc.size;

		//TODO: handle input beeotch!
		console.log("=== FILE ===");
		console.log("PATH: " + path);
		console.log("NAME: " + fname);
		console.log("SIZE: " + size);

		var obj = xlsx.parse(fs.readFileSync('./' + path));
		console.log(obj);

		res.render('Import/index', { parseData : obj });
	});

};
