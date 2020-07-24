// create the router to handle requests
const router = require('express').Router();

// require the weekController
const weekController = require('../controllers/week_controller');


// route to view the habits on week page
router.get('/view-weekly',weekController.view);

// route to change the status of the habit
router.get('/change-status/:id/:weekday/:status',weekController.changeStatus);


// export the router
module.exports = router;
