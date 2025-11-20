import pool from "../config/db.js"

const BillModel = {
    async getAll() {
        const result = await pool.query(`
            SELECT 
                b.*, 
                p.name AS patient_name,
                u.name AS created_by_name
            FROM bills b 
            LEFT JOIN patients p on p.id = b.patient_id
            LEFT JOIN users u on u.id = b.created_by
            ORDER BY b.id DESC
        `);
        return result.rows;
    },

    async getCount() {
        const result = await pool.query("SELECT COUNT(*) AS total FROM bills WHERE DATE(created_at) = CURRENT_DATE");

        return Number(result.rows[0].total);
    },

    async create({bill_no, patient_id, total_amount, discount, paid_amount, status, remarks, created_by }) {
        const result = await pool.query("INSERT INTO bills (bill_no, patient_id, total_amount, discount, paid_amount, status, remarks ,created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [bill_no, patient_id, total_amount, discount, paid_amount, status, remarks, created_by]);
        return result.rows[0];
    },

    async getById(id) {
        const result = await pool.query(`
            SELECT 
                b.*, 
                p.name AS patient_name,
                u.name AS created_by_name
            FROM bills b 
            LEFT JOIN patients p on p.id = b.patient_id
            LEFT JOIN users u on u.id = b.created_by
            WHERE b.id = $1
            ORDER BY b.id DESC
        `, [id]);
        return result.rows;
    },

    async update(id, {bill_no, patient_id, total_amount, discount, paid_amount, status, remarks, created_by }) {
        const result = await pool.query("UPDATE bills SET bill_no=$1, patient_id=$2, total_amount=$3, discount=$4, paid_amount=$5, status=$6, remarks=$7, created_by=$8 WHERE id=$9 RETURNING *", [bill_no, patient_id, total_amount, discount, paid_amount, status, remarks, created_by, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM bills WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}

export default BillModel
