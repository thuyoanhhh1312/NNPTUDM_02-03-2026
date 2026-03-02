const User = require("../models/User");

// CREATE - Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    const user = new User({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      role,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Lấy tất cả users (không bao gồm đã xóa mềm)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).populate("role");
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE - Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (email) updateData.email = email;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (avatarUrl) updateData.avatarUrl = avatarUrl;
    if (role) updateData.role = role;

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      updateData,
      { new: true, runValidators: true },
    ).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE - Xóa mềm user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ENABLE - Kích hoạt user (chuyển status về true)
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and username are required",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        email: email,
        username: username,
        isDeleted: false,
      },
      { status: true },
      { new: true },
    ).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or credentials do not match",
      });
    }

    res.status(200).json({
      success: true,
      message: "User enabled successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DISABLE - Vô hiệu hóa user (chuyển status về false)
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: "Email and username are required",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        email: email,
        username: username,
        isDeleted: false,
      },
      { status: false },
      { new: true },
    ).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or credentials do not match",
      });
    }

    res.status(200).json({
      success: true,
      message: "User disabled successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// RESTORE - Khôi phục user đã xóa
exports.restoreUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: true },
      { isDeleted: false },
      { new: true },
    ).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DELETED - Lấy danh sách users đã xóa
exports.getDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true }).populate("role");
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
