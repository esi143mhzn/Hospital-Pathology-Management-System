import pool from "../config/db.js"

const createPatientTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) on DELETE CASCADE,
            name VARCHAR(100),
            address VARCHAR(100),
            identity_type VARCHAR(30) DEFAULT 'Citizenship_id', -- identities: Citizenship_id, SeniorCitizenship_id, Staff_id,
            identity_number VARCHAR(100),
            age INT,
            gender VARCHAR(10),
            created_at TIMESTAMP DEFAULT NOW()
        )
    `;    

    try {
        pool.query(queryText);
        console.log("Patient table created if not exists");
    } catch (error) {
        console.log("Error creating patients table: ", error);
    }
}

export default createPatientTable;