import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 3000;

// connect first, then start listening
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI, process.env.DB_NAME);
    app.listen(PORT, () =>
      console.log(`API running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
})();
