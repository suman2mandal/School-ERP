// Load environment variables from a ..env file into process..env
import dotenv from "dotenv";
dotenv.config();

// Import required dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

// Import routes from the routes folder
import studentRoute from "./routes/studentRoutes.js";
import feesRoute from "./routes/feesRoutes.js";
import schoolRoute from "./routes/schoolRoutes.js"
import empRoute from "./routes/empRoutes.js"
import attendanceRoute from "./routes/attendanceRoutes.js"
import studentFeesRoute from "./routes/studentFeesRoutes.js"
// import contactUsRoute from "./routes/contactRoutes.js";

// Define the server's port, using the specified port or default to 5000
const serverPort = process.env.PORT || 5000;

// Create an instance of the Express application
const apiServer = express();

// Using installed middlewares for parsing requests.

// Middleware to parse JSON requests
apiServer.use(express.json());

// Middleware to parse URL-encoded requests
apiServer.use(express.urlencoded({ extended: false }));

// Additional JSON parsing middleware
apiServer.use(bodyParser.json());

// Middleware for parsing cookies
apiServer.use(cookieParser());

// Cross-Origin Resource Sharing (CORS) middleware configuration
apiServer.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// Middleware for serving static files (e.g., file uploads)
// apiServer.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to the MongoDB database using the provided URI in the environment variables
mongoose
    .connect(process.env.mongodbUri)
    .then(() => {
        apiServer.get('/', (req, res) => {
            res.send("Welcome 👋 to School ERP 👩‍🏫");
        });
        // Use middlewares imported from the middlewares folder

        // Middleware to use the student routes
        apiServer.use("/api/students", studentRoute);

        // Middleware to use the fees routes
        apiServer.use("/api/fees", feesRoute);

        // Middleware to use the school routes
        apiServer.use("/api/school", schoolRoute)

        // Middleware to use emp routes
        apiServer.use("/api/emp", empRoute)

        //Middleware to use attendance routes
        apiServer.use("/api/attendance", attendanceRoute)

        // Middleware to use student fees routes
        apiServer.use("/api/studentfees", studentFeesRoute)

        // Uncomment and add similar middleware for contactUsRoute if needed
        // apiServer.use('/api/contactus/', contactUsRoute)

        // Start the Express server, listening on the specified port
        apiServer.listen(serverPort, () => {
            console.log(`Server running on port: ${serverPort}`);
        });
    })
    .catch((err) => console.log(err));
