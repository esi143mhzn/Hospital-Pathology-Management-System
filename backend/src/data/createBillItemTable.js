import pool from "../config/db.js"

const CreateBillItemTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS bill_items (
            id SERIAL PRIMARY KEY,
            bill_id INT NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
            test_category_id INT REFERENCES test_categories(id),
            price NUMERIC(12,2) DEFAULT 0,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("BillItem table created if not exists");
    } catch (error) {
        console.log("Error creating billitems table: ", error);
    }
}

export default CreateBillItemTable;