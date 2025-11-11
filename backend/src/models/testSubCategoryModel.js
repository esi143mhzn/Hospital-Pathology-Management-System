import pool from "../config/db.js";

const TestSubCategory = {
    async create({ category_id, name, short_name, unit, reference_range  }) {
        const result = await pool.query("INSERT INTO test_subcategories (category_id, name, short_name, unit, reference_range) VALUES ($1, $2, $3, $4, $5) RETURNING *", [category_id, name, short_name, unit, reference_range]);
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query("SELECT * FROM test_subcategories");
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query("SELECT * FROM test_subcategories WHERE id = $1", [id]);
        return result.rows[0];
    },

    async update(id, { category_id, name, short_name, unit, reference_range }) {
        const result = await pool.query("UPDATE test_subcategories SET category_id = $1, name=$2, short_name=$3, unit=$4, reference_range=$5 WHERE id=$6 RETURNING *", [category_id, name, short_name, unit, reference_range, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM test_subcategories WHERE id=$1 RETURNING *", [id]);
        return result.rows[0];
    }
};

export default TestSubCategory;