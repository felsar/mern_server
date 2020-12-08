const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: { //create reference to User Id
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdDtm: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);