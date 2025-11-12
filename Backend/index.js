import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import app from "./app.js";

dotenv.config();

//connected to mongoDB
connectDB();

//start server
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});