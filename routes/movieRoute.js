const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
const uploadMiddleware = require('../middleware/multerFile')
const multer = require('multer')
const storage = require('../config/cloudinary')
const upload = multer({
    storage: storage
})
const path = require('path')

// CRUD Movie
router.get('/movies', movieController.getAllMovies)
router.get('/movies/paginate', movieController.getMoviesByPaginate)
router.get('/movies/:id', movieController.getMoviesById)
router.post('/movies', movieController.createMovies)
router.put('/movies/:id', movieController.updateMovies)
router.delete('/movies/:id', movieController.deleteMovies)

// Create With Photo
router.post('/movies/uploadFile', upload.single('photo'), movieController.createMoviesWithPhoto)

// Upload File Movies
router.put('/movies/upload/:id', upload.single('photo'), movieController.updatePhoto)

// Upload File
router.put('/contact/upload', multer({
    storage: uploadMiddleware.diskStorage
}).single('photo'), uploadMiddleware.fileMulter)
router.use('/upload', express.static(path.join(__dirname, '../uploads')))

// export this router to use in our index.js
module.exports = router