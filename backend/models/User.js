const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   email: {
        type: String,
        required: true,
        unique: true
    },
    userImage:
    {
      type:String,
      required: false
      
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
    screendata:[],
    restrict:[],
});

module.exports = mongoose.model('user', UserSchema);
