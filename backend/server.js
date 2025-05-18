import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";

import userRoutes from "./routes/user.routes.js";
import sentimentRoutes from "./routes/sentiment.routes.js";

dotenv.config();
await connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", userRoutes);
app.use("/api/sentiment", sentimentRoutes);

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
