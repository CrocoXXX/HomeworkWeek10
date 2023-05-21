const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Authentication = require('../models/authenticationModel')

// Retrieve register the users saved in the database
exports.register = async (req, res) => {
    try {
        const {
            email,
            gender,
            password,
            role
        } = req.body
        let hashedPassword = await bcrypt.hash(password, 10)

        await Authentication.register(email, gender, hashedPassword, role)

        res.json({
            status: 'User Registered.',
            data: {
                email,
                gender,
                hashedPassword,
                role
            }
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to register users.'
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
    } catch (error) {
        res.status(500).json({
            error: 'Failed to Login Users'
        })
    }
}