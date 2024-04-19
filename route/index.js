const express = require("express");
const router = express.Router();
const car = require("./car");
const option = require("./option")
const spec = require("./spec")
const auth = require("./auth");


router.use("/auth", auth);

router.use("/car", car);

router.use("/option", option);

router.use("/spec", spec);

module.exports = router;
