//create new js router
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller');
eventsController = require('./controllers/events.controller');

// export router
module.exports = router;

router.get('/', mainController.showHome)
router.get('/events', eventsController.showEvents)
// seed events
router.get('/events/seed', eventsController.seedEvents)

router.get('/events/:slug', eventsController.showSingle)