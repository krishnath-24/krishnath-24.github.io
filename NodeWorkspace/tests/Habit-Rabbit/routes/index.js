const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.use('/',require('./week'));


router.get('/',homeController.home);

router.post('/create-habit',homeController.createHabit);

router.get('/delete-habit/:id', homeController.deleteHabit);

module.exports = router;