var router = require('express').Router();

router.get('/', function(req, res){
	if (!req.user)
		return res.render('index', {layout: 'landing'});

	res.render('dashboard', {user: req.user});
});

//======================
// Hook up Middleware
//======================
var SetupUserMiddleware = require('./middleware/SetupUser');
router.use(SetupUserMiddleware);

module.exports = router;
