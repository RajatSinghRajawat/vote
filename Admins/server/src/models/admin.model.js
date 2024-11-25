const { mongoose } = require("mongoose");
const { string } = require("zod");

const schema = new mongoose.Schema({
    email: String,
    passsword: String
});



module.exports = {
    Admin: mongoose.model('Admins', schema)
} 