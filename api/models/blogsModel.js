const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    title: { type: String, require: true },
    featured_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    slug: { type: String, require: true },
    except: { type: String, require: true },
    description: { type: String },
    category_id: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: "Category" }
      ],
    tags: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: "tag" }
      ],
    status: { type: Boolean, default: false },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    comment_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    comment_status: { type: Boolean, default: false },
    comment_count: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
