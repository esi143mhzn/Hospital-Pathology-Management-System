import pool from "../config/db.js";

const createTestTable = async() => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS tests (
            id SERIAL PRIMARY KEY,
            subcategory_id INT REFERENCES test_subcategories(id) ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            unit VARCHAR(50),
            reference_range VARCHAR(100),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("Test table created if not exists");
    } catch (error) {
        console.log("Error creating Test table: ", error);
    }
}

export default createTestTable;