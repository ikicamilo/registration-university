const { Estudiante, Materia, MateriaEstudiante } = require("../models");

exports.getAllMaterias = async () => {
  return await Materia.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

exports.getAllEstudiantesByMaterias = async () => {
  try {
    const materias = await Materia.findAll({
      attributes: ["nomMat"],
      include: [
        {
          model: MateriaEstudiante,
          as: "materias_estudiantes",
          attributes: ["codEst"],
          include: [
            {
              model: Estudiante,
              as: "estudiantes",
              attributes: ["nomEst", "apelEst"],
            },
          ],
        },
      ],
    });

    return materias;
  } catch (error) {
    console.error("Error fetching estudiantes: ", error);
    throw error;
  }
};
