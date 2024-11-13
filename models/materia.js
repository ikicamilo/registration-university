/**
 * @openapi
 * components:
 *   schemas:
 *     Materia:
 *       type: object
 *       properties:
 *         codIntMat:
 *           type: integer
 *           readOnly: true
 *           description: "Código de la materia (Autoincrementable)"
 *           x-auto-increment: true
 *         nomMat:
 *           type: string
 *           example: Física
 *           description: "Nombre de la materia"
 *         creMat:
 *           type: string
 *           example: Física
 *           description: "Créditos de la materia"
 *         codProf:
 *           type: integer
 *           example: 100
 *           description: "Código del profesor (Llave foránea de Profesores)"
 *         createdAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de creación de la Materia"
 *         updatedAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de actualización de la Materia"
 */
module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define(
    "Materia",
    {
      codIntMat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomMat: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      creMat: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      codProf: {
        type: DataTypes.INTEGER,
        references: {
          model: "Profesor",
          key: "codIntProf",
        },
      },
    },
    {
      tableName: "materias",
      timestamps: true,
      underscored: false,
    }
  );

  return Materia;
};
