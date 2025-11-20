import pool from "../config/db.js"

const CreateBillTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS bills (
            id SERIAL PRIMARY KEY,
            bill_no VARCHAR(50) UNIQUE NOT NULL,
            patient_id INT REFERENCES patients(id) ON DELETE CASCADE,
            total_amount NUMERIC(12,2) DEFAULT 0,
            discount NUMERIC(12,2) DEFAULT 0,
            paid_amount NUMERIC(12,2) DEFAULT 0,
            status VARCHAR(30) DEFAULT 'unpaid',  --unpaid, partial, paid
            created_by INT REFERENCES users(id),
            remarks TEXT,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Bill table created if not exists");
    } catch (error) {
        console.log("Error creating bills table: ", error);
    }
}

export default CreateBillTable;