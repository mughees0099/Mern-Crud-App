import mongoose from "mongoose";
import express from "express";
import Blog from "./schema.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/class1-blog-app")
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed"));

app.get("/blog", async (req, res) => {
  const blogData = await Blog.find();
  res.send(blogData);
});

app.post("/blog", async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.send(newBlog);
});

// app.get("/blog/:id", (req, res) => {
//   const name = req.params.id;
//   res.send(`Hello ${name}`);
// });

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
  res.send(deletedBlog);
});

app.listen(3000, () => console.log("App is running on port 3000"));
