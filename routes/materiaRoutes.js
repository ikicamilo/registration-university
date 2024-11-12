const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");

router.get("/all", materiaController.getAllMaterias);

module.exports = router;
