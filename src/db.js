// src/db.js
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
// Optional but useful: fail fast instead of buffering
mongoose.set("bufferCommands", false);

let cached =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

export async function connectDB(uri, dbName) {
  if (!uri) throw new Error("MONGODB_URI missing");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName, serverSelectionTimeoutMS: 8000 })
      .then((m) => {
        console.log("✅ MongoDB connected:", dbName || "(from URI)");
        return m.connection;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/*
import mongoose from "mongoose";

// connect to SchoolShootingDB
export async function connectDB(uri, dbName) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName });
  console.log("MongoDB connected:", dbName);
}
  */
