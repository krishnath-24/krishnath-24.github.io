// require express module
const express = require('express');

// create the router
const router = express.Router();

// require the home controller
const homeController = require('../controllers/home_controller');

// use the week router
router.use('/',require('./week'));

// define the home route
router.get('/',homeController.home);

// route to create a habit
router.post('/create-habit',homeController.createHabit);

// route to delete a habit
router.get('/delete-habit/:id', homeController.deleteHabit);

// export the router
module.exports = router;