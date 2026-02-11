import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://news-project-06582-frontend.vercel.app",
    "https://j34vsk-5173.csb.app",
  ]
}));

app.use(express.json());

// Routes
app.use("/news", newsRoutes);

// Test route
app.get("/", (req, res) => res.send("AI News Backend Running"));

// Run backend on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
