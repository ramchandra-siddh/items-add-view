import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import router from "./routes/itemRoutes.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);
app.use("/api/items", router);

//api endpoints
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log("Server started", port);
});
