const mongoose = require('mongoose');
const slugify = require('slugify');

Schema = mongoose.Schema;

// create a shema
const eventSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String
})
// meadleware
eventSchema.pre('save', function (next) {
    this.slug = slugify(this.name).toLowerCase();
    next();
})

// create  the model
const eventModel = mongoose.model('Event', eventSchema)
// export the model
module.exports = eventModel;