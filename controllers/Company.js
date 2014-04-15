var Company = require('../models/Company');

module.exports = function(app) {

    app.get('/Company', function(req, res){
        if (!req.user)
            res.redirect('/');

        Company.findById(req.user.company, function(err, company){
            if(err) return console.log(err);

            res.render('Company/index', {company: company});
        });
    });

};
