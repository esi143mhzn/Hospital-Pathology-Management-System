import express from 'express';
import dotenv from "dotenv";
import pool from "./config/db.js";
import createUserTable from './data/createUserTable.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middlewares

// Routes

// Error Handling Middlewares

// Create user table before starting server
createUserTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
})

//Server running
app.listen(port, () => console.log(`Server is listening on port ${port}`));