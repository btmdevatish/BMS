const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    post_id: { type: mongoose.Schema.ObjectId, require: true },
    name: { type: String, require: true },
    slug: { type: String, require: true },
    is_deleted: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tag", tagSchema)

