import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8080;

(async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Connected to MongoDB...");

    app.listen(port, () => {
      console.log(`Express server is running at http://localhost:${port}`);
    });

  } catch (error) {
    console.log("Error: could not connect to MongoDB ");
    process.exit(1);
  }
})();
