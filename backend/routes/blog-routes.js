// import express from "express";
const express = require("express");
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
} = require( "../controllers/blog-controller.js");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

// export default blogRouter;

// blog-routes.js

// Instead of export default blogRouter;
module.exports = blogRouter;

