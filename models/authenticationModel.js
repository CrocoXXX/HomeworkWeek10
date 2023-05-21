const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = express.Router()
const pool = require('../config/database')

// Model methods for interacting with Authentication
const Authentication = {
    // Function Register
    register: async (email, gender, password, role) => {
        const query = `INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4)`
        const result = await pool.query(query, [email, gender, password, role])

        return result.rows
    },

    // Function Login
    // login: async (email, password) => {
    //     const query = `SELECT * FROM users WHERE email = ${email}`
    //     const result = await pool.query(query, [password])
    // }
}

module.exports = Authentication