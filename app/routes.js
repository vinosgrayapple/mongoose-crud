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
// create events
router.get('/events/create', eventsController.showCreate)
router.post('/events/create', eventsController.processCreate)
// edit event
router.get('/events/:slug/edit', eventsController.showEdit)
router.post('/events/:slug', eventsController.processEdit)
// delete events
router.get('/events/:slug/delete', eventsController.deleteEvent)
router.get('/events/:slug', eventsController.showSingle)