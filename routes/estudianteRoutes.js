const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getAllEstudiantes,
  createEstudiante,
  getEstudiantesByCodEst,
  callSPInfoEstudiante,
} = require("../controllers/estudianteController");

router.get("/all", getAllEstudiantes);
router.get("/classmates/:codEst", getEstudiantesByCodEst);
router.get("/info/:codEst", callSPInfoEstudiante);

router.post(
  "/create",
  [
    body("nomEst")
      .isString()
      .withMessage("El nombre es obligatorio")
      .trim()
      .notEmpty(),
    body("apelEst")
      .isString()
      .withMessage("El apellido es obligatorio")
      .trim()
      .notEmpty(),
    body("emailEst")
      .isEmail()
      .withMessage("El email debe ser válido")
      .normalizeEmail(),
  ],
  createEstudiante
);

module.exports = router;
