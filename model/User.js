const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: [20, "Max Length Should be 20"],
        min: [5, "Min Length Should be 5"]
    },
    roles: {
        User: {
            type: Number,
            default: 1000
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);