const mongoose = require('mongoose');
// const ExtensionData=require("./ExtensionData").schema;

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now, 
        required: true
    },
    screendata:[]
});

module.exports = mongoose.model('user', UserSchema);
