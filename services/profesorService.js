const { Profesor, Materia } = require("../models");

exports.getAllProfesores = async () => {
  return await Profesor.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

exports.getAllProfesoresWithMaterias = async () => {
  return await Profesor.findAll({
    include: [
      {
        model: Materia,
        as: "materias",
        attributes: ["nomMat"],
      },
    ],
  });
};
