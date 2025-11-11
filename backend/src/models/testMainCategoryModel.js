import pool from "../config/db.js";

const TestMainCategory = {
    async create({ name }) {
        const result = await pool.query("INSERT INTO test_main_categories (name) VALUES ($1) RETURNING *", [name]);
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM test_main_categories");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM test_main_categories WHERE id = $1", [id]);
        return result.rows[0];
    },

    async update(id, { name }) {
        const result = await pool.query("UPDATE test_main_categories SET name=$1 WHERE id=$2 RETURNING *", [name, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM test_main_categories WHERE id=$1 RETURNING *", [id]);
        return result.rows[0];
    }
};

export default TestMainCategory;