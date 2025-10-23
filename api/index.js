import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/db.js";

await connectDB(process.env.MONGODB_URI, process.env.DB_NAME);

export default app;
