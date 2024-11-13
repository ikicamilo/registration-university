const { Materia } = require("../models");

exports.getAllMaterias = async () => {
  return await Materia.findAll({
    order: [["updatedAt", "DESC"]],
  });
};
