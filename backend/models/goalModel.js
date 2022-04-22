const mongoose = require('mongoose')

const goalScehma = mongoose.Schema({
    text: {
        type: String,
        required: [true,'Please Add a text value']
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Goal',goalScehma)