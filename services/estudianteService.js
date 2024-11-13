const {
  Op,
  sequelize,
  Estudiante,
  Materia,
  MateriaEstudiante,
} = require("../models");
const axios = require("axios");

exports.getAllEstudiantes = async () => {
  return await Estudiante.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

exports.createEstudiante = async (data) => {
  const { nomEst, apelEst, emailEst } = data;

  const existingEstudiante = await Estudiante.findOne({
    where: { emailEst },
  });

  if (existingEstudiante) {
    throw new Error("El estudiante ya existe con ese email");
  }

  const newEstudiante = await Estudiante.create({
    nomEst,
    apelEst,
    emailEst,
  });

  return newEstudiante;
};

exports.updateEstudiante = async (codIntEst, data) => {
  const { nomEst, apelEst, emailEst, preCreEst } = data;

  const existingEstudiante = await Estudiante.findOne({
    where: { codIntEst },
  });

  if (!existingEstudiante) {
    throw new Error("El estudiante no existe");
  }

  if (existingEstudiante.emailEst !== emailEst) {
    const emailExists = await Estudiante.findOne({
      where: { emailEst },
    });

    if (emailExists) {
      throw new Error("Un estudiante ya existe con ese email");
    }
  }

  existingEstudiante.nomEst = nomEst || existingEstudiante.nomEst;
  existingEstudiante.apelEst = apelEst || existingEstudiante.apelEst;
  existingEstudiante.emailEst = emailEst || existingEstudiante.emailEst;
  existingEstudiante.preCreEst = preCreEst || existingEstudiante.preCreEst;

  await existingEstudiante.save();

  return existingEstudiante;
};

exports.deleteEstudiante = async (codIntEst) => {
  const estudiante = await Estudiante.findOne({
    where: { codIntEst },
  });

  if (!estudiante) {
    throw new Error("El estudiante no existe");
  }

  await estudiante.destroy();

  return { message: "Estudiante eliminado correctamente" };
};

exports.getEstudiantesByCodEst = async (codEst) => {
  try {
    const estudiantes = await Estudiante.findAll({
      attributes: ["nomEst", "apelEst"],
      include: [
        {
          model: MateriaEstudiante,
          as: "materias_estudiantes",
          attributes: ["codMat"],
          where: {
            codMat: {
              [Op.in]: sequelize.literal(
                `(SELECT codMat FROM materias_estudiantes WHERE codEst = ${codEst})`
              ),
            },
            codEst: {
              [Op.ne]: codEst,
            },
          },
          include: [
            {
              model: Materia,
              as: "materias",
              attributes: ["nomMat"],
            },
          ],
        },
      ],
    });

    return estudiantes;
  } catch (error) {
    console.error("Error fetching estudiantes: ", error);
    throw error;
  }
};

exports.callSPInfoEstudiante = async (codIntEst) => {
  try {
    const estudiante = await Estudiante.findOne({
      where: { codIntEst },
    });

    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }

    const exchangeRates = await axios.get(
      "https://api.frankfurter.app/latest?to=USD,EUR"
    );

    const precioCredEuros = exchangeRates.data.rates.USD * estudiante.preTotEst;

    const estudiantePlain = estudiante.get({ plain: true });

    const [results, metadata] = await sequelize.query(
      "CALL GetEstudianteMateriasDetails(:codIntEst)",
      {
        replacements: { codIntEst },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const materias = Object.values(results);

    estudiantePlain.preCredEur = precioCredEuros;
    estudiantePlain.materias = materias;

    return estudiantePlain;
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  }
};
