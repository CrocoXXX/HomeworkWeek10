const pool = require('../config/database')

// Model methods for interacting with the Movies
const Movie = {
    // Function GET
    getAll: async () => {
        const query = `SELECT * FROM movies ORDER BY id ASC`
        const result = await pool.query(query)

        return result.rows
    },
    getByPaginate: async (page, limit) => {
        const offset = (page - 1) * limit
        const query = `SELECT * FROM movies ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
        const result = await pool.query(query)

        return result.rows
    },
    getById: async (id) => {
        const query = `SELECT * FROM movies WHERE id = ${id}`
        const result = await pool.query(query)

        return result.rows[0]
    },

    // Function POST
    create: async (title, genres, year) => {
        try {
            const query = `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`
            const result = await pool.query(query, [title, genres, year])

            // console.log(result)
            return result.rows
        } catch (error) {
            console.log(error);
        }
    },
    createWithPhoto: async (title, genres, year, photo) => {
        const query = `INSERT INTO movies ("title", "genres", "year", "photo") VALUES ($1, $2, $3, $4);`
        const result = await pool.query(query, [title, genres, year, photo])

        return result.rows
    },

    // Function PUT
    update: async (id, title, genres, year) => {
        const query = `UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1`
        const result = await pool.query(query, [id, title, genres, year])

        return result.rows
    },
    updatePhoto: async (id, fileMulter) => {
        const query = `UPDATE movies SET photo = $2 WHERE id = $1 RETURNING *`
        const result = await pool.query(query, [id, fileMulter])

        return result.rows
    },

    // Function DELETE
    delete: async (id) => {
        const query = `DELETE FROM movies WHERE ID = ${id}`
        const result = await pool.query(query)
    }
}

module.exports = Movie