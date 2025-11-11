import pool from "../config/db.js";

const TestCategory = {
    async create({ main_category_id, name, short_name, unit, reference_range, price  }) {
        const result = await pool.query("INSERT INTO test_categories (main_category_id, name, short_name, unit, reference_range, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [main_category_id, name, short_name, unit, reference_range, price]);
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM test_categories");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM test_categories WHERE id = $1", [id]);
        return result.rows[0];
    },

    async update(id, { main_category_id, name, short_name, unit, reference_range, price }) {
        const result = await pool.query("UPDATE test_categories SET main_category_id = $1, name=$2, short_name=$3, unit=$4, reference_range=$5, price=$6 WHERE id=$7 RETURNING *", [main_category_id, name, short_name, unit, reference_range, price, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM test_categories WHERE id=$1 RETURNING *", [id]);
        return result.rows[0];
    }
};

export default TestCategory;