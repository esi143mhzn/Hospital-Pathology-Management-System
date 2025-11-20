import pool from "../config/db.js"

const BillItemModel = {
    async getAll() {
        const result = await pool.query(`
            SELECT 
                bi.* ,
                c.short_name AS category_name,
                c.price AS price
            FROM bill_items bi
            LEFT JOIN test_categories c ON c.id = bi.test_category_id
            ORDER BY bi.id DESC
        `);
        return result.rows;
    },

    async create({bill_id, test_category_id, price }) {
        const result = await pool.query("INSERT INTO bill_items (bill_id, test_category_id, price) VALUES ($1, $2, $3) RETURNING *", [bill_id, test_category_id, price]);
        return result.rows[0];
    },

    async getById(bill_id) {
        const result = await pool.query(`
            SELECT 
                bi.* ,
                c.short_name AS category_name,
                c.price AS price
            FROM bill_items bi
            LEFT JOIN test_categories c ON c.id = bi.test_category_id
            WHERE bi.bill_id=$1
            ORDER BY bi.id DESC
        `, [bill_id]);
        return result.rows;
    },

    async update(id, {bill_id, test_category_id, price }) {
        const result = await pool.query("UPDATE bill_items SET bill_id=$1, test_category_id=$2, price=$3 WHERE id=$4 RETURNING *", [bill_id, test_category_id, price, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM bill_items WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}

export default BillItemModel
