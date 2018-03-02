var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var Product = require('../models/product');

router.use(csrfProtection);
router.get('/profile', isLoggedIn, function(req, res, next){
    res.render('user/profile', {title: 'Profile'});
  }); 
 
router.get('/logout',isLoggedIn, function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});


router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {title: 'Sign up', csrfToken : req.csrfToken(),
   messages : messages, hasErrors : messages.length > 0});
});


router.post('/signup', passport.authenticate('local.signup', {
  successRedirect : '/user/profile',
  failureRedirect : '/user/signup',
  failureFlash : true
}));

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signin', {title: 'Sign In', csrfToken : req.csrfToken(), messages : messages, hasErrors : messages.length > 0});

});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect : '/user/profile',
  failureRedirect : '/user/signin',
  failureFlash : true
}));




module.exports = router;
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};