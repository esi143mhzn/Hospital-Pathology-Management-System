import pool from "../config/db.js";

const createTestCategoryTable = async() => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS test_categories (
            id SERIAL PRIMARY KEY,
            main_category_id INT REFERENCES test_main_categories(id) ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            short_name VARCHAR(50),
            unit VARCHAR(50),
            reference_range VARCHAR(100),
            price DECIMAL(10,2),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("TestCategory table created if not exists");
    } catch (error) {
        console.log("Error creating TestCategory table: ", error);
    }
}

export default createTestCategoryTable;