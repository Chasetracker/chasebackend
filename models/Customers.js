const mongoose = require('mongoose');
const Schema = mongoose.Schema
const customerSchema = Schema({
    user: { type: Schema.Types.ObjectId, required: "User ID is requred", ref: 'User' },
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },

    // Other fields related to customers
});



const Customer = mongoose.model("Customer", customerSchema)

module.exports = { Customer }
