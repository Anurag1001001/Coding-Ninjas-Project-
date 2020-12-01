// this is root file of routes

const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

//any request comes with "/user"  router will require "user.js" file to complete task
router.use('/user', require('./user_profile'));

// user post
router.use('/posts', require('./user_post'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));


// if we don't export this router this will not be publically available to all and whenever request comes to this routes app.js file  will not be able to use this file 
module.exports = router;