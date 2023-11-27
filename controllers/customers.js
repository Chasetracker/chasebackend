// Assuming you have Express set up and your User model imported
const express = require('express');
const router = express.Router();
const { Customer } = require('../models/Customers');
const { User } = require('../models/User')

// POST route to add a new customer
const AddCustomer = async (req, res) => {
    try {
        // Fetch the authenticated user based on the user ID
        const user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status_code: 404,
            });
        }

        // Extract the data for the new customer from the request body
        const { name, email, phoneNumber } = req.body;

        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(400).json({
                message: 'Customer with this email already exists',
                status_code: 400,
            });
        }



        // Create a new customer associated with the user
        const newCustomer = new Customer({
            user: user._id,
            name,
            email,
            phoneNumber,
        });

        // Save the new customer
        await newCustomer.save();

        // Add the customer to the user's list of customer

        res.status(201).json({
            message: 'Customer added successfully',
            newCustomer: newCustomer,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the customer by ID
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
                status_code: 404,
            });
        }

        res.status(200).json({
            message: 'Customer found',
            customer: customer,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getCustomers = async (req, res) => {
    try {
        // Fetch the authenticated user based on the user ID
        const user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status_code: 404,
            });
        }

        // Fetch all customers associated with the user
        const customers = await Customer.find({ user: user._id });

        res.status(200).json({
            message: 'Customers retrieved successfully',
            customers: customers,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { AddCustomer, getCustomerById, getCustomers }
