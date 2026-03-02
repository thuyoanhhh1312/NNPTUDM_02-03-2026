const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false, // Dùng cho xóa mềm
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  },
);

module.exports = mongoose.model("Role", roleSchema);
