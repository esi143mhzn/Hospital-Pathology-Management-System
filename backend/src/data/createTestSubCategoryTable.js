import pool from "../config/db.js";

const createTestSubCategoryTable = async() => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS test_subcategories (
            id SERIAL PRIMARY KEY,
            category_id INT REFERENCES test_categories(id) ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            short_name VARCHAR(50),
            unit VARCHAR(50),
            reference_range VARCHAR(100),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        pool.query(queryText);
        console.log("TestSubCategory table created if not exists");
    } catch (error) {
        console.log("Error creating TestSubCategory table: ", error);
    }
}

export default createTestSubCategoryTable;