const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    attendees: {
        type: Number,
        required: true
    },
    foodProvided: {
        type: Boolean,
        required: true
    },
    geminiSummary: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Event', eventSchema);