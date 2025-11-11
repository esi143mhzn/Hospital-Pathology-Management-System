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

    async getChildren(parentId) {
        const result = await pool.query("SELECT * FROM tests WHERE parent_id = $1", [parentId]);
        return result.rows;
    },

    async create({ name, parent_id = null, level = 1, unit, reference_range, price }) {
        const result = await pool.query("INSERT INTO tests (name, parent_id, level, unit, reference_range, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, parent_id, level, unit, reference_range, price]);
        return result.rows[0];
    },

     async update(id, {name, parent_id, level, unit, reference_range, price}) {
        const result = await pool.query("UPDATE tests SET name = $1, parent_id = $2, level = $3, unit = $4, reference_range = $5, price = $6 WHERE id = $7 RETURNING *", [name, parent_id, level, unit, reference_range, price, id]);
        return result.rows[0];
     }
}

export default TestModel;