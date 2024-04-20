const express = require("express");
const router = express.Router();
const { register, login, profile, updateRole } = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware(["user", "admin","super-admin"]), profile);
router.put("/change-role/:id", authMiddleware(["super-admin"]), updateRole);

module.exports = router;
