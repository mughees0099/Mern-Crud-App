// if (process.env.NODE_ENV !== "production") {
import dotenv from "dotenv";
dotenv.config();
// }

import mongoose from "mongoose";
import express from "express";
import Blog from "./schema.js";
import cors from "cors";
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed"));

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

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

app.listen(3000, () => console.log("App is running on port 3000"));
