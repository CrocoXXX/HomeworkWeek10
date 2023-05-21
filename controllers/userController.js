const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

// Retrieve all the users saved in the database
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll()
        res.json({
            data: users
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users.'
        })
    }
}

exports.getUsersByPaginate = async (req, res) => {
    try {
        const {
            page,
            limit
        } = req.query
        const users = await User.getByPaginate(page, limit)
        res.json({
            data: users
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users.'
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const users = await User.getById(id)

        if (!users) {
            res.status(404).json({
                error: 'Users not found.'
            })
        } else {
            res.json({
                data: users
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users.'
        })
    }
}

// Retrieve create the movies saved in the database
// exports.createUsers = async (req, res) => {
//     try {
//         const {
//             email,
//             gender,
//             password,
//             role
//         } = req.body
//         const users = await User.create(email, gender, password, role)
//         res.json({
//             status: 'Successfully Insert Data',
//             data: {
//                 email,
//                 gender,
//                 password,
//                 role
//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: 'Failed to fetch users.'
//         })
//     }
// }

// Retrieve update the movies saved in the database
exports.updateUsers = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            email,
            gender,
            password,
            role
        } = req.body
        const users = await User.update(id, email, gender, password, role)

        if (!users) {
            res.status(404).json({
                error: 'Users not found.'
            })
        } else {
            res.json({
                status: 'Successfully Update Data.',
                data: {
                    id,
                    email,
                    gender,
                    password,
                    role
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users.'
        })
    }
}

// Retrieve delete the movies saved in the database
exports.deleteUsers = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const users = await User.delete(id)

        if (!users) {
            res.status(404).json({
                error: 'Users not found.'
            })
        } else {
            res.json({
                status: 'Successfully Delete Data.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Failed to fetch users.'
        })
    }
}