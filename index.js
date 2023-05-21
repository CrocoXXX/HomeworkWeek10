const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const movieRoutes = require('./routes/movieRoute')
const userRoutes = require('./routes/userRoute')
const authenticationRoutes = require('./routes/authenticationRoute')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(movieRoutes)
app.use(userRoutes)
app.use(authenticationRoutes)


// Parse requests of content-type - application/json
app.use(express.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))

// Example simple router
app.get('/', (req, res) => {
    res.send('Welcome to Rakamin Homework 10 by Lawrence Adi Noman')
})

// Connected to Database
const pool = require('./config/database')
pool.connect((err, res) => {
    console.log(`Database Connected.`)
})

// Set PORT, listen for request
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})