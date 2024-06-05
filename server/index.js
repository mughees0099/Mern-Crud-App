// if (process.env.NODE_ENV !== "production") {
import dotenv from "dotenv";
dotenv.config();
// }

import mongoose from "mongoose";
import express from "express";
import Blog from "./schema.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed"));

// Serve static files from the React app

app.get("/blog", async (req, res) => {
  const blogData = await Blog.find();
  res.send(blogData);
});

app.post("/blog", async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.send(newBlog);
});

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blogData = await Blog.findById(id);
  res.send(blogData);
});

app.patch("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body);
  res.send(updatedBlog);
});

app.delete("/blog/:id", async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.send("Blog deleted successfully");
});
app.use(express.static(path.resolve(__dirname, "client", "dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => console.log("App is running on port 3000"));
