import pool from "../config/db.js";

const TestModel = {
    async getAll() {
        const result = await pool.query("SELECT * FROM tests ORDER BY id ASC");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM tests WHERE id = $1", [id]);
        return result.rows[0];
    },

    async create({ name, subcategory_id, unit, reference_range }) {
        const result = await pool.query("INSERT INTO tests (name, subcategory_id, unit, reference_range) VALUES ($1, $2, $3, $4) RETURNING *", [name, subcategory_id, unit, reference_range]);
        return result.rows[0];
    },

     async update(id, {name, subcategory_id, unit, reference_range}) {
        const result = await pool.query("UPDATE tests SET name = $1, subcategory_id = $2, unit = $3, reference_range = $4 WHERE id = $5 RETURNING *", [name, subcategory_id, unit, reference_range, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM tests RETURNING *", [id]);
        return result.rows[0];
    }
}

export default TestModel;