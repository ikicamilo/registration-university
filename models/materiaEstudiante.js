/**
 * @openapi
 * components:
 *   schemas:
 *     MateriaEstudiante:
 *       type: object
 *       properties:
 *         codEst:
 *           type: integer
 *           description: "Código del estudiante (Lláve foránea de Estudiantes)"
 *         codMat:
 *           type: integer
 *           description: "Código de la Materia (Lláve foránea de Materias)"
 *         createdAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de creación de MateriaEstudiante"
 *         updatedAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de actualización del MateriaEstudiante"
 */
module.exports = (sequelize, DataTypes) => {
  const MateriaEstudiante = sequelize.define(
    "MateriaEstudiante",
    {
      codEst: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código del Estudiante",
        primaryKey: true,
      },
      codMat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código de la Materia",
        primaryKey: true,
      },
    },
    {
      tableName: "materias_estudiantes",
      timestamps: true,
      underscored: false,
    }
  );

  MateriaEstudiante.associate = (models) => {
    MateriaEstudiante.belongsTo(models.Estudiante, {
      foreignKey: "codEst",
      targetKey: "codIntEst",
      onDelete: "CASCADE",
      as: "estudiantes",
    });

    MateriaEstudiante.belongsTo(models.Materia, {
      foreignKey: "codMat",
      targetKey: "codIntMat",
      onDelete: "CASCADE",
      as: "materias",
    });
  };

  return MateriaEstudiante;
};
