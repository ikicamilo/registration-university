const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");

/**
 * @openapi
 * /api/materia/all:
 *   get:
 *     tags:
 *       - Materias
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
 *                     $ref: "#/components/schemas/Materia"
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
router.get("/all", materiaController.getAllMaterias);

/**
 * @openapi
 * /api/materia/all-estudiantes:
 *   get:
 *     tags:
 *       - Estudiantes por materia
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
 *                       nomMat:
 *                         type: string
 *                         example: Español
 *                       materias_estudiante:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             codEst:
 *                               type: integer
 *                               example: 1
 *                             estudiantes:
 *                               type: object
 *                               properties:
 *                                 nomEst:
 *                                   type: string
 *                                   example: Camilo
 *                                 apelEst:
 *                                   type: string
 *                                   example: Barrantes
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
router.get("/all-estudiantes", materiaController.getAllEstudiantesByMaterias);

module.exports = router;
