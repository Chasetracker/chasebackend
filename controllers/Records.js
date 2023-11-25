
// const express = require('express');
// const router = express.Router();
const { Invoice } = require('../models/Records');
const { User } = require('../models/User')   // Assuming the schema is defined in invoiceModel.js

const createInvoice = async (req, res) => {
    try {
        // Extract relevant data from the request body
        const {
            customerName,
            customerEmail,
            totalSalesAmount,
            dueDate,
            status,
            reminder
        } = req.body;

        // Fetch user information based on the user ID from the authenticated request
        const user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status_code: 404,
            });
        }

        // Create a new MinistryType document and associate it with the user
        const newInvoice = new Invoice({
            user: user._id,
            customerName,
            customerEmail,
            totalSalesAmount,
            dueDate,
            status,
            reminder  // Associate the ministry with the user's ID

        });

        // Save the new MinistryType to the database
        await newInvoice.save();

        res.status(201).json({
            message: 'New Invoice created successfully',
            newInvoice: newInvoice
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getInvoices = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status_code: 404,
            });
        }

        const Invoiceinfo = await Invoice.find({ user: user._id })

        res.status(200).json({
            message: 'Invoice Record retrieved successfully',
            InvoiceRecord: Invoiceinfo
        });

    } catch (error) {
        console.log(error)
    }
}

module.exports = { createInvoice, getInvoices };

