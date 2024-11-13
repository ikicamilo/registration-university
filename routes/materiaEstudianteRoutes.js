const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getAllMateriasByEstudiantes,
  registerEstudianteToMateria,
  unregisterEstudianteToMateria,
} = require("../controllers/materiaEstudianteController");

/**
 * @openapi
 * /api/materia_estudiante/all:
 *   get:
 *     tags:
 *       - Materias-Estudiantes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/MateriaEstudiante"
 *       500:
 *         description: SERVER ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Server Error"
 */
router.get("/all", getAllMateriasByEstudiantes);

/**
 * @openapi
 * /api/materia_estudiante/register:
 *   post:
 *     tags:
 *       - Registrar Estudiante en Materia
 *     requestBody:
 *       description: Objeto JSON del *estudiante*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MateriaEstudiante"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/MateriaEstudiante"
 *       500:
 *         description: SERVER ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Server Error"
 */
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

/**
 * @openapi
 * /api/materia_estudiante/unregister:
 *   delete:
 *     tags:
 *       - Desuscribir Estudiante en Materia
 *     requestBody:
 *       description: Objeto JSON del *estudiante*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MateriaEstudiante"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Estudiante desuscrito de la materia correctamente"
 *       500:
 *         description: SERVER ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Server Error"
 */
router.delete(
  "/unregister",
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
  unregisterEstudianteToMateria
);

module.exports = router;
