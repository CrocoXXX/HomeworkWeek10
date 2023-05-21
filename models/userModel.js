const pool = require('../config/database')

// Model methods for interacting with the Movies
const User = {
    // Function GET
    getAll: async () => {
        const query = 'SELECT * FROM users ORDER BY id ASC'
        const result = await pool.query(query)

        return result.rows
    },
    getByPaginate: async (page, limit) => {
        const offset = (page - 1) * limit
        const query = `SELECT * FROM users ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
        const result = await pool.query(query)

        return result.rows
    },
    getById: async (id) => {
        const query = `SELECT * FROM users WHERE id = ${id}`
        const result = await pool.query(query)

        return result.rows[0]
    },

    // Function POST
    // create: async (email, gender, password, role) => {
    //     const query = 'INSERT INTO users ("email", "gender", "password", "role") VALUES ($1, $2, $3, $4)'
    //     const result = await pool.query(query, [email, gender, password, role])

    //     return result.rows
    // },

    // Function PUT
    update: async (id, email, gender, password, role) => {
        const query = `UPDATE users SET email = $2, gender = $3, password = $4, role = $5 WHERE id = $1`
        const result = await pool.query(query, [id, email, gender, password, role])

        return result.rows
    },

    // Function DELETE
    delete: async (id) => {
        try {
            const query = `DELETE FROM users WHERE ID = ${id}`
            await pool.query(query)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = User