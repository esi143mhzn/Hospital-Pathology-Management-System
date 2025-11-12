import pool from "../config/db.js";

const UserModel = {

    async findByEmail(email) {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        return result.rows[0];
    },
    
    async createUser({name, email, password, role}) {
        const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, password, role]);
        return result.rows[0];
    },

    async getUsers() {
        const result = await pool.query("SELECT * FROM users ORDER BY created_at ASC");
        return result.rows;
    },

    async getUsersById(id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },

    async updateUsers(id, { name, email, role, password }) {
        const result = await pool.query("UPDATE users SET name = $1, email = $2, role=$3, password=$4 WHERE id = $5 RETURNING *", [name, email, role, password, id]);
        return result.rows[0];
    },

    async deleteUsers(id) {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    },

};

export default UserModel;