const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");

router.get("/all", profesorController.getAllProfesores);
router.get("/all-materias", profesorController.getAllProfesoresWithMaterias);

module.exports = router;
