/**
 * @openapi
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         codIntEst:
 *           type: integer
 *           readOnly: true
 *           description: "Código del estudiante (Autoincrementable)"
 *           x-auto-increment: true
 *         nomEst:
 *           type: string
 *           example: Tommy
 *           description: "nombre del estudiante"
 *         apelEst:
 *           type: string
 *           example: Jackson
 *           description: "apellido del estudiante"
 *         emailEst:
 *           type: string
 *           example: tommy@yahoo.com
 *           description: "email del estudiante (Campo único)"
 *         preCreEst:
 *           type: number
 *           format: float
 *           example: 150
 *           readOnly: true
 *           description: "Precio por crédito del estudiante"
 *         preTotEst:
 *           type: number
 *           format: float
 *           example: 150
 *           readOnly: true
 *           description: "Precio Total de los créditos del estudiante"
 *         createdAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de creación del estudiante"
 *         updatedAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de actualización del estudiante"
 */
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define(
    "Estudiante",
    {
      codIntEst: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "Código interno del Estudiante",
      },
      nomEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombres del Estudiante",
      },
      apelEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Apellidos del Estudiante",
      },
      emailEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Email del Estudiante",
      },
      preCreEst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 150,
        comment: "Precio crédito Estudiante",
      },
      preTotEst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
        comment: "Precio total semestre del Estudiante",
      },
    },
    {
      tableName: "estudiantes",
      timestamps: true,
      underscored: false,
    }
  );

  return Estudiante;
};
