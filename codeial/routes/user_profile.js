const express = require('express');
const router =  express.Router();
const userController = require('../controllers/user_controller');

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);

// if we don't export this router this will not be publically available to all and whenever request comes to this routes index.js file of routes will not be able to use this file 

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);

module.exports = router ;