
/*
 * GET home page, which is specified in Jade.
 */
var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

exports.do_work = function(req, res){
  res.render('index.jade', { 
	  title: 'Please enter a person login' 
  });
};
exports.do_ref = function(req, res){
  res.render('reference.jade', {});
};
exports.do_yourwork = function(req, res){
  res.render('yourwork.jade', {});
};

module.exports = router;