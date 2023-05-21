const express = require('express')
// const router = express.Router()
const multer = require('multer')
const path = require('path') // Penamaan file secara dinamis

// Menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Menerapkan middleware multer hanya pada rute berikut:
const fileMulter = (req, res) => {
    const file = req.file.path
    const filename = req.file.filename
    // const file = req
    console.log(file)
    if (!file) {
        res.status(400).send({
            status: false,
            data: 'No File is Selected.'
        })
    }

    // Menyimpan lokasi upload data contacts pada index yang diinginkan
    res.send({
        directory: file,
        status: 'Upload Successfully',
        link: `http://localhost:8000/upload/${filename}`
    })
}

module.exports = {
    diskStorage,
    fileMulter
}