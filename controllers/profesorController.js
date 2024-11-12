const profesorService = require("../services/profesorService");

exports.getAllProfesores = async (req, res) => {
  try {
    const profesores = await profesorService.getAllProfesores();
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllProfesoresWithMaterias = async (req, res) => {
  try {
    const profesores = await profesorService.getAllProfesoresWithMaterias();
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
