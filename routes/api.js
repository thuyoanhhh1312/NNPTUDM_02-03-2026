const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CREATE
router.post("/", userController.createUser);

// READ
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

// UPDATE
router.put("/:id", userController.updateUser);

// DELETE (xóa mềm)
router.delete("/:id", userController.deleteUser);

// RESTORE (khôi phục) - Đặt trước :id để tránh conflict
router.get("/deleted/list", userController.getDeletedUsers);
router.post("/:id/restore", userController.restoreUser);

// ENABLE/DISABLE
router.post("/enable", userController.enableUser);
router.post("/disable", userController.disableUser);

module.exports = router;
