const express = require('express');
const router =  express.Router();
const userController = require('../controllers/user_controller');

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.get('/profile', userController.profile);



// if we don't export this router this will not be publically available to all and whenever request comes to this routes index.js file of routes will not be able to use this file 

router.post('/create', userController.create);
router.post('/createSession', userController.createSession);
router.post('/signout', userController.signout);

module.exports = router;