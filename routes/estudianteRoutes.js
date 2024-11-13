const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getAllEstudiantes,
  createEstudiante,
  getEstudiantesByCodEst,
  callSPInfoEstudiante,
  updateEstudiante,
  deleteEstudiante,
} = require("../controllers/estudianteController");

/**
 * @openapi
 * /api/estudiante/all:
 *   get:
 *     tags:
 *       - Estudiantes
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
 *                     $ref: "#/components/schemas/Estudiante"
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
router.get("/all", getAllEstudiantes);

/**
 * @openapi
 * /api/estudiante/classmates/{codEst}:
 *   get:
 *     tags:
 *       - Compañeros del estudiante
 *     parameters:
 *       - in: path
 *         name: codEst
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Estudiante
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
 *                     type: object
 *                     properties:
 *                       nomEst:
 *                         type: string
 *                         example: "Juan"
 *                       apelEst:
 *                         type: string
 *                         example: "Perez"
 *                       materias_estudiantes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             codMat:
 *                               type: integer
 *                               example: 1
 *                             materias:
 *                               type: object
 *                               properties:
 *                                 nomMat:
 *                                   type: string
 *                                   example: Español
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
router.get("/classmates/:codEst", getEstudiantesByCodEst);

/**
 * @openapi
 * /api/estudiante/info/{codEst}:
 *   get:
 *     tags:
 *       - Información del estudiante
 *     parameters:
 *       - in: path
 *         name: codEst
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Estudiante
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
 *                   allOf:
 *                     - $ref: "#/components/schemas/Estudiante"
 *                     - type: object
 *                       properties:
 *                         materias:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               nomMat:
 *                                 type: string
 *                                 example: Álgebra
 *                               nomProf:
 *                                 type: string
 *                                 example: Cristiano
 *                               apelProf:
 *                                 type: string
 *                                 example: Ronaldo
 *
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
router.get("/info/:codEst", callSPInfoEstudiante);

/**
 * @openapi
 * /api/estudiante/create:
 *   post:
 *     tags:
 *       - Creación de Estudiantes
 *     requestBody:
 *       description: Objeto JSON del *estudiante*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Estudiante"
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
 *                     $ref: "#/components/schemas/Estudiante"
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

/**
 * @openapi
 * /api/estudiante/update/{codEst}:
 *   put:
 *     tags:
 *       - Actualizar Estudiante
 *     parameters:
 *       - in: path
 *         name: codEst
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Estudiante
 *     requestBody:
 *       description: Objeto JSON del *estudiante*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Estudiante"
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
 *                     $ref: "#/components/schemas/Estudiante"
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
router.put(
  "/update/:codEst",
  [
    body("nomEst").isString().trim(),
    body("apelEst").isString().trim(),
    body("emailEst")
      .isEmail()
      .withMessage("El email debe ser válido")
      .normalizeEmail(),
    body("preCreEst").isNumeric().withMessage("El precio debe ser numérico"),
  ],
  updateEstudiante
);

/**
 * @openapi
 * /api/estudiante/delete/{codEst}:
 *   delete:
 *     tags:
 *       - Eliminar estudiante
 *     parameters:
 *       - in: path
 *         name: codEst
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Estudiante
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
 *                       example: "Estudiante eliminado correctamente"
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
router.delete("/delete/:codEst", deleteEstudiante);

module.exports = router;
