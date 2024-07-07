import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8080;

(async function connectDB() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/', {
      dbName: 'ecommerce'
    });
    console.log("Connected to MongoDB...");

    app.listen(port, () => {
      console.log(`Express server is running at http://localhost:${port}`);
    });

  } catch (error) {
    console.log("Error: could not connect to MongoDB ", error);
    process.exit(1);
  }
})();
