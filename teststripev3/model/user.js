const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    stripeCusId: {
        type: String,
    }
});
module.exports = mongoose.model('Users', userSchema);



