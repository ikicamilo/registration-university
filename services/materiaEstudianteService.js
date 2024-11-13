const { MateriaEstudiante } = require("../models");

exports.getAllMateriasByEstudiantes = async () => {
  return await MateriaEstudiante.findAll({
    order: [["codEst", "ASC"]],
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

exports.unregisterEstudianteToMateria = async (data) => {
  const { codEst, codMat } = data;

  const existingEstudiante = await MateriaEstudiante.findOne({
    where: { codEst, codMat },
  });

  if (!existingEstudiante) {
    throw new Error("El estudiante no tiene esa materia asignada");
  }

  await existingEstudiante.destroy();

  return { message: "Estudiante desuscrito de la materia correctamente" };
};
