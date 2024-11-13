const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");

/**
 * @openapi
 * /api/profesor/all:
 *   get:
 *     tags:
 *       - Profesor
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
 *                     $ref: "#/components/schemas/Profesor"
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
router.get("/all", profesorController.getAllProfesores);

/**
 * @openapi
 * /api/profesor/all-materias:
 *   get:
 *     tags:
 *       - Materias por Profesor
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
 *                     allOf:
 *                       - $ref: "#/components/schemas/Profesor"
 *                       - type: object
 *                         properties:
 *                           materias:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 nomMat:
 *                                   type: string
 *                                   example: Álgebra
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
router.get("/all-materias", profesorController.getAllProfesoresWithMaterias);

module.exports = router;
