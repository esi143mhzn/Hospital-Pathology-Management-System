import pool from "../config/db.js";

const PatientModel = {
    async getAll() {
        const result = await pool.query("SELECT * FROM patients ORDER BY id ASC");
        return result.rows;
    },

    async create({user_id, name, address, identity_type, identity_number, age, gender }) {
        const result = await pool.query("INSERT INTO patients (user_id, name, address, identity_type, identity_number, age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [user_id, name, address, identity_type, identity_number, age, gender]);
        return result.rows[0];
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
        return result.rows[0];
    },

    async update(id, {user_id, name, address, identity_type, identity_number, age, gender}) {
        const result = await pool.query("UPDATE patients SET user_id = $1, name = $2, address = $3, identity_type = $4, identity_number = $5, age = $6, gender = $7 WHERE id = $8 RETURNING *", [user_id, name, address, identity_type, identity_number, age, gender, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM patients WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}

export default PatientModel;