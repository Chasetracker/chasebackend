const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = Schema({
    user: { type: Schema.Types.ObjectId, required: "User ID is requred", ref: 'User' },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    totalSalesAmount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    reminder: {
        type: String,
        default: 'None'
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = { Invoice }

