const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// CREATE
router.post("/", roleController.createRole);

// READ
router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);

// UPDATE
router.put("/:id", roleController.updateRole);

// DELETE (xóa mềm)
router.delete("/:id", roleController.deleteRole);

// RESTORE (khôi phục) - Đặt trước :id để tránh conflict
router.get("/deleted/list", roleController.getDeletedRoles);
router.post("/:id/restore", roleController.restoreRole);

module.exports = router;
