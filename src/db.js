import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let cached =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

export async function connectDB(uri, dbName) {
  if (!uri) throw new Error("MONGODB_URI missing");

  // If connection already exists, use it
  if (cached.conn) {
    return cached.conn;
  }

  // Otherwise, start a new connection
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName })
      .then((m) => {
        console.log("✅ MongoDB connected:", dbName);
        return m;
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
