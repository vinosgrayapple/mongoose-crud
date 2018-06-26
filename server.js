// load enviroment variables
require('dotenv').config()

// grab our dependensies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8008,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    expressValidator = require('express-validator');

//configure our aplication
// set session and cookie parser
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 60000
    },
    resave: false, // forces the session to be saved back
    saveUninitialized: false // dont save unmodified
}))
app.use(flash())

mongoose.connect(process.env.DB_URI)
//  use body parser for grab info from a form
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(expressValidator())

app.use(express.static(__dirname + '/public'))
// set ejs as out templating
app.set('view engine', 'ejs')
app.use(expressLayouts)
//set the routes
app.use(require('./app/routes'))


// start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})