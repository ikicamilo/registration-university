/**
 * @openapi
 * components:
 *   schemas:
 *     Profesor:
 *       type: object
 *       properties:
 *         codIntProf:
 *           type: integer
 *           readOnly: true
 *           description: "Código del profesor (Autoincrementable)"
 *           x-auto-increment: true
 *         nomProf:
 *           type: string
 *           example: Tommy
 *           description: "nombre del profesor"
 *         apelProf:
 *           type: string
 *           example: Jackson
 *           description: "apellido del profesor"
 *         emailProf:
 *           type: string
 *           example: tommy@yahoo.com
 *           description: "email del profesor (Campo único)"
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
  const Profesor = sequelize.define(
    "Profesor",
    {
      codIntProf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomProf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apelProf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailProf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "profesores",
      timestamps: true,
      underscored: false,
    }
  );

  Profesor.associate = (models) => {
    Profesor.hasMany(models.Materia, {
      foreignKey: "codProf",
      as: "materias",
    });
  };

  return Profesor;
};
