import express from "express";
import cors from "cors";
import api from "./api";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/movies/top", async (req, res) => {
  try {
    const movies = await api("top");
    res.json(movies);
  } catch (error) {
    console.error("Error fetching top movies:", error);
    res.status(500).json({ error: "Failed to fetch top movies." });
  }
});

app.get("/api/movies/search", async (req, res) => {
  const query = req.query.q as string;
  if (!query) {
    res.status(400).json({ error: "Search query is required." });
    return;
  }
  console.log("Search query:", query);
  try {
    const movies = await api("search", query);
    res.json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies." });
  }
});

app.get("/api/movies/info/", async (req, res) => {
  const movieId = req.query.id as string;
  if (!movieId) {
    res.status(400).json({ error: "Movie ID is required." });
    return;
  }
  try {
    const movieInfo = await api("info", movieId);
    res.json(movieInfo);
  } catch (error) {
    console.error("Error fetching movie info:", error);
    res.status(500).json({ error: "Failed to fetch movie info." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
