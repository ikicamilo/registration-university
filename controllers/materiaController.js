const materiaService = require("../services/materiaService");

exports.getAllMaterias = async (req, res) => {
  try {
    const materias = await materiaService.getAllMaterias();
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllMateriasWithProfesor = async (req, res) => {
  try {
    const materias = await materiaService.getAllMateriasWithProfesor();
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllEstudiantesByMaterias = async (req, res) => {
  try {
    const materias = await materiaService.getAllEstudiantesByMaterias();
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
