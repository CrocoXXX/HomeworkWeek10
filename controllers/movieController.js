const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path') // Penamaan file secara dinamis
// const pool = require('../config/database')
const Movie = require('../models/movieModel')

// Retrieve all the movies saved in the database
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll()
        res.json({
            data: movies
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies.'
        })
    }
}

exports.getMoviesByPaginate = async (req, res) => {
    try {
        const {
            page,
            limit
        } = req.query
        const movies = await Movie.getByPaginate(page, limit)
        res.json({
            data: movies
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies.'
        })
    }
}

exports.getMoviesById = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const movies = await Movie.getById(id)

        if (!movies) {
            res.status(404).json({
                error: 'Movies not found '
            })
        } else {
            res.json({
                data: movies
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies.'
        })
    }
}

// Retrieve create the movies saved in the database
exports.createMovies = async (req, res) => {
    try {
        const {
            title,
            genres,
            year
        } = req.body
        const movies = await Movie.create(title, genres, year)
        // console.log(movies)
        res.json({
            status: 'Succesfully Insert Data.',
            data: {
                title,
                genres,
                year
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Failed to fetch movies'
        })
    }
}

exports.createMoviesWithPhoto = async (req, res) => {
    try {
        const {
            title,
            genres,
            year
        } = req.body
        const photo = req.file.path
        const movie = await Movie.createWithPhoto(title, genres, year, photo)

        res.json({
            status: 'Succesfully Insert Data.',
            data: {
                title,
                genres,
                year,
                photo
            }
        })
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create movies.'
        })
    }
}

// Retrieve update the movies saved in the database
exports.updateMovies = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            title,
            genres,
            year
        } = req.body
        const movies = await Movie.update(id, title, genres, year)

        if (!movies) {
            res.status(404).json({
                error: 'Movies not found.'
            })
        } else {
            res.json({
                status: 'Succesfully Update Data.',
                data: {
                    id,
                    title,
                    genres,
                    year
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies.'
        })
    }
}

exports.updatePhoto = async (req, res) => {
    try {
        const id = req.params.id
        const fileMulter = req.file.path

        const photo = await Movie.updatePhoto(id, fileMulter)

        if (!photo) {
            console.log(photo)
            res.status(400).json({
                status: false,
                data: 'No File is Selected.'
            })
        } else {
            res.json({
                status: 'Upload Successfully',
                directory: fileMulter,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Failed to update photo in table movies.'
        })
    }
}

// Retrieve delete the movies saved in the database
exports.deleteMovies = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const movies = await Movie.delete(id)

        if (!movies) {
            res.status(404).json({
                error: 'Movies not found.'
            })
        } else {
            res.json({
                status: 'Succesfully Delete Data'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch movies.'
        })
    }
}