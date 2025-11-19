import pool from "../config/db.js";

const createTestMainCategoryTable = async() => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS test_main_categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("TestMainCategory table created if not exists");
    } catch (error) {
        console.log("Error creating TestMainCategory table: ", error);
    }
}

export default createTestMainCategoryTable;