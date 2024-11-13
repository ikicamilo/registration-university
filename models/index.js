const { DataTypes, Op } = require("sequelize");
const sequelize = require("../sequelize");

const Estudiante = require("./estudiante")(sequelize, DataTypes);
const Profesor = require("./profesor")(sequelize, DataTypes);
const Materia = require("./materia")(sequelize, DataTypes);
const MateriaEstudiante = require("./materiaEstudiante")(sequelize, DataTypes);

Profesor.associate({
  Materia,
});

Estudiante.hasMany(MateriaEstudiante, {
  foreignKey: "codEst",
  as: "materias_estudiantes",
});

MateriaEstudiante.belongsTo(Estudiante, {
  foreignKey: "codEst",
  as: "estudiantes",
});

Materia.hasMany(MateriaEstudiante, {
  foreignKey: "codMat",
  as: "materias_estudiantes",
});
MateriaEstudiante.belongsTo(Materia, { foreignKey: "codMat", as: "materias" });

module.exports = {
  sequelize,
  Op,
  Estudiante,
  Profesor,
  Materia,
  MateriaEstudiante,
};
