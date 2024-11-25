const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    image:{
        type:"string",
        required:true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    }
});

module.exports = {
    participantModel:mongoose.model('ParticipantData', participantSchema)
}
