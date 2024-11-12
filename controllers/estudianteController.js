const estudianteService = require("../services/estudianteService");
const { validationResult } = require("express-validator");

exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await estudianteService.getAllEstudiantes();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createEstudiante = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nomEst, apelEst, emailEst } = req.body;
    const newEstudiante = await estudianteService.createEstudiante({
      nomEst,
      apelEst,
      emailEst,
    });

    return res.status(201).json(newEstudiante);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear el estudiante", error: error.message });
  }
};

exports.getEstudiantesByCodEst = async (req, res) => {
  const { codEst } = req.params;

  try {
    const estudiantes = await estudianteService.getEstudiantesByCodEst(codEst);
    return res.json(estudiantes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error fetching estudiantes." });
  }
};

exports.callSPInfoEstudiante = async (req, res) => {
  const { codEst } = req.params;

  try {
    const estudiante = await estudianteService.callSPInfoEstudiante(codEst);
    return res.json(estudiante);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error fetching estudiante SP." });
  }
};
