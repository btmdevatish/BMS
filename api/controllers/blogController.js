const mongoose = require("mongoose");

const Blog = require("../models/blogsModel");

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find()
    .populate({
      path: "featured_id"
    });
    if (blog.length > 0) {
      res.status(200).json({
        code: 1,
        data: blog,
      });
    } else {
      res.status(204).json({
        code: 0,
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in blog",
      error: error,
    });
  }
};

exports.postBlog = async (req, res, next) => {
  try {
    const trimmedSlug = req.body.title.trim().toLowerCase();
    const slug = trimmedSlug.replace(/\s+/g, "-");
    const blogData = new Blog({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      featured_id: req.body.featured_id,
      slug: slug,
      except: req.body.except,
      description: req.body.description,
      category_id: req.body.category_id,
      tags: req.body.tags,
      status: req.body.status,
      author_id: req.body.author_id,
      comment_id: req.body.comment_id,
      comment_status: req.body.comment_status,
      comment_count: req.body.comment_count,
    });

    const blog = await blogData.save();
    res.status(200).json({
      code: 1,
      data: "Blog added successfuly",
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in blog",
      error: error,
    });
  }
};

exports.getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find({ _id: req.params.blogsID })
      .populate({
        path: "featured_id"
      })
      .populate({
        path: "author_id",
        select: "-password",
      })
      .populate({
        path: "category_id"
      })
      .populate({
        path: "tags"
      })
      .populate({
        path: "comment_id"
      });

    // const category = await Category.findById(req.params.categoryID)
    console.log(blog);
    if (blog.length > 0) {
      res.status(200).json({
        code: 1,
        data: blog,
      });
    } else {
      res.status(204).json({
        code: 0,
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in blog",
      error: error,
    });
  }
};

// view all listing blog


