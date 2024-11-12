const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getAllMateriasByEstudiantes,
  registerEstudianteToMateria,
} = require("../controllers/materiaEstudianteController");

router.get("/all", getAllMateriasByEstudiantes);
router.post(
  "/register",
  [
    body("codEst")
      .isInt()
      .withMessage("El código del estudiante debe ser un número entero")
      .notEmpty()
      .withMessage("El código del estudiante es obligatorio")
      .toInt(),

    body("codMat")
      .isInt()
      .withMessage("El código de la materia debe ser un número entero")
      .notEmpty()
      .withMessage("El código de la materia es obligatorio")
      .toInt(),
  ],
  registerEstudianteToMateria
);

module.exports = router;
