import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from './middlewares/errorHandler.js';
import createUserTable from './data/createUserTable.js';
import createPatientTable from './data/createPatientTable.js';
import patientRoutes from "./routes/patientRoutes.js";
import createTestMainCategoryTable from './data/createTestMainCategoryTable.js';
import createTestCategoryTable from './data/createTestCategoryTable.js';
import createTestSubCategoryTable from './data/createTestSubCategoryTable.js';
import createTestTable from './data/createTestTable.js';
import testRoutes from "./routes/testRoutes.js";
import testMainCategoryRoutes from './routes/testMainCategoryRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/main-category", testMainCategoryRoutes);

// Error Handling Middlewares
app.use(errorHandling);

// Create user table before starting server
createUserTable();
createPatientTable();
createTestMainCategoryTable();
createTestCategoryTable();
createTestSubCategoryTable();
createTestTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
})

//Server running
app.listen(port, () => console.log(`Server is listening on port ${port}`));