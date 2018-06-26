const Event = require('../models/event')
module.exports = {
    showEvents,
    showSingle,
    seedEvents,
    showCreate,
    processCreate,
    showEdit,
    processEdit,
    deleteEvent
}


function showEvents(req, res) {
    // get all events
    Event.find({}, (err, events) => {
        if (err) {
            res.status(404);
            res.send('Events not found!')
        }
        res.render('pages/events', {
            events,
            success: req.flash('success')
        })

    })

    // return a view with data


    // show a single  event

}

function showSingle(req, res) {
    Event.findOne({
        slug: req.params.slug
    }, (err, event) => {
        if (err) {
            res.status(404);
            res.send('Events not found!')
        }
        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        })
    })

}

function seedEvents(req, res) {
    const events = [{
            name: 'Basketball',
            description: "Throwing into a basket."
        },
        {
            name: 'Swimming',
            description: "Michael Phelps is the fast fish."
        },
        {
            name: 'Wheitlifting',
            description: "Lifting heavy thing up."
        },
        {
            name: 'Ping Pong',
            description: "Cool Game"
        }
    ]
    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event)
            newEvent.save();
        }
    })
    // seeded
    res.send('Database seeded')

}

/* 
* Show the create form

*/
function processCreate(req, res) {
    // validate information
    req.checkBody('name', 'Name is required.').notEmpty()
    req.checkBody('description', 'Description is required.').notEmpty()
    // if error redirecvt and save errors to flash
    const errors = req.validationErrors()
    if (errors) {
        req.flash('errors', errors.map(err => err.msg))
        return res.redirect('/events/create')
    }

    // create a new element
    const event = new Event({
        name: req.body.name,
        description: req.body.description
    })
    // save event
    event.save(err => {
        if (err) {
            throw err
        }
        // set a successful message
        req.flash('success', 'Succesfully created event!')
        // rtedirect to the newly created event

        res.redirect(`/events/${event.slug}`)
    })
}

function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    })
}

function showEdit(req, res) {
    Event.findOne({
        slug: req.params.slug
    }, (err, event) => {

        res.render('pages/edit', {
            event,
            errors: req.flash('errors')
        })
    })
}

function processEdit(req, res) {
    // validate information
    req.checkBody('name', 'Name is required.').notEmpty()
    req.checkBody('description', 'Description is required.').notEmpty()
    // if error redirecvt and save errors to flash
    const errors = req.validationErrors()
    if (errors) {
        req.flash('errors', errors.map(err => err.msg))
        return res.redirect(`/events/${req.params.slug}/edit`)
    }
    // finding current event
    Event.findOne({
        slug: req.params.slug
    }, (err, event) => {
        // updating that    event
        event.name = req.body.name
        event.description = req.body.description
        event.save(err => {
            if (err) {
                throw err
            }
            // success flash event
            req.flash('success', 'Successfully update event.')
            // redirect basck to the events
            res.redirect('/events')
        })

    })
}
/* 
 * Delete on event
 */
function deleteEvent(req, res) {
    Event.remove({
        slug: req.params.slug
    }, err => {
        if (err) {
            throw err
        }
        // set flash data 
        req.flash('success', 'Deleted Event successfully.')
        // redirect back to the events page
        res.redirect('/events');
    })
}