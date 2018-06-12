const Event = require('../models/event')
module.exports = {
    showEvents: (req, res) => {
        // get all events


        // return a view with data
        res.render('pages/events', {
            events
        })
        // show a single  event

    },
    showSingle: (req, res) => {
        const event = {
            name: 'Basketball',
            slug: 'basketball',
            description: "Throwing into a basket."
        }
        res.render('pages/single', {
            event: event
        })
    },
    seedEvents: (req, res) => {
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
        for (event of events) {
            var newEvent = new Event(event)
            newEvent.save();
        }
        // seeded
        res.send('Database seeded')

    }
}