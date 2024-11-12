const { MateriaEstudiante } = require("../models");

exports.getAllMateriasByEstudiantes = async () => {
  return await MateriaEstudiante.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

exports.registerEstudianteToMateria = async (data) => {
  const { codEst, codMat } = data;

  const existingEstudiante = await MateriaEstudiante.findOne({
    where: { codEst, codMat },
  });

  if (existingEstudiante) {
    throw new Error("El estudiante ya tiene esa materia asignada");
  }

  const newEstudiante = await MateriaEstudiante.create({
    codEst,
    codMat,
  });

  return newEstudiante;
};
