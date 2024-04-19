const express = require("express");
const router = express.Router();

const carController = require("../controller/car");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(["user","admin", "super-admin"]),carController.getCars)
  .post(authMiddleware(["admin", "super-admin"]),carController.createCar);

router
  .route("/:id")
  .get(authMiddleware(["user","admin", "super-admin"]),carController.getCar)
  .put(authMiddleware(["admin", "super-admin"]),carController.updateCar)
  .delete(authMiddleware(["admin", "super-admin"]),carController.deleteCar);

module.exports = router;
