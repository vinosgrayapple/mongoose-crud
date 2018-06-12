// load enviroment variables
require('dotenv').config()

// grab our dependensies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8008,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');

//configure our aplication
mongoose.connect(process.env.DB_URI)
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