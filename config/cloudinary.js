const cloudinary = require('cloudinary').v2
const {
    CloudinaryStorage
} = require('multer-storage-cloudinary')
const dotenv = require('dotenv')
dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png'], // Specify the allowed file formats
    }
})

module.exports = storage