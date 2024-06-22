import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import dotenv from "dotenv";
import errorHandler from "./middleware/Error.middleware";
import authRoutes from "./routes/auth.route";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes)


// error handler
app.use(errorHandler);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;