const express = require("express");
const router = express.Router();
const Fantacy = require("../controllers/fantacyController");


router.get("/", Fantacy.allFantacy);

// router.get("/:categoryID", Category.getSingleCategory);

module.exports = router;