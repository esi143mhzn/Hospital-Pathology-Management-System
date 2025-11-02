import pool from "../config/db.js";

const UserModel = {
    
    async createUser({name, email, password, role}) {
        const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, password, role]);
        return result.rows[0];
    },

};

export default UserModel;