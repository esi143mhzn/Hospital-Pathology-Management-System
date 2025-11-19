import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(30) DEFAULT 'LabTechnologist', -- roles: Admin, Doctor, LabTechnologist
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;

    try {
        await pool.query(queryText);
        console.log("User table created if not exists");
    } catch (error) {
        console.log("Error creating users table: ", error);
    }
};

export default createUserTable;