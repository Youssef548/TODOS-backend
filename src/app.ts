import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import dotenv from "dotenv";
import errorHandler from "./middleware/Error.middleware";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

// Load environment variables
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// swaggerDocs(app , PORT);

// Routes
app.use("/api", authRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use(errorHandler);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;