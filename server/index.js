import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from Correctional Compass");
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8000, () =>
      console.log("Server Started on the port http://localhost:8000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
