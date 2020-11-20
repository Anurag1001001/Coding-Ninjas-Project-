const express = require('express');
const router =  express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/profile/:id',passport.checkAuthentication, userController.profile);

// if we don't export this router this will not be publically available to all and whenever request comes to this routes index.js file of routes will not be able to use this file 

router.post('/create', userController.create);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
), userController.createSession);

// signout routes and functionality
router.get('/signout', userController.destroySession);

module.exports = router ;