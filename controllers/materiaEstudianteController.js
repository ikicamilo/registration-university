const materiaEstudianteService = require("../services/materiaEstudianteService");
const { validationResult } = require("express-validator");

exports.getAllMateriasByEstudiantes = async (req, res) => {
  try {
    const materiasByEstudiantes =
      await materiaEstudianteService.getAllMateriasByEstudiantes();
    res.json(materiasByEstudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.registerEstudianteToMateria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { codEst, codMat } = req.body;
    const newRegisterEstudianteMateria =
      await materiaEstudianteService.registerEstudianteToMateria({
        codEst,
        codMat,
      });

    return res.status(201).json(newRegisterEstudianteMateria);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al inscribir el estudiante a la materia",
      error: error.message,
    });
  }
};

exports.unregisterEstudianteToMateria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { codEst, codMat } = req.body;
    const newUnregisterEstudianteMateria =
      await materiaEstudianteService.unregisterEstudianteToMateria({
        codEst,
        codMat,
      });

    return res.status(201).json(newUnregisterEstudianteMateria);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al inscribir el estudiante a la materia",
      error: error.message,
    });
  }
};
