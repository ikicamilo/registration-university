module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define(
    "Estudiante",
    {
      codIntEst: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "Código interno del Estudiante",
      },
      nomEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombres del Estudiante",
      },
      apelEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Apellidos del Estudiante",
      },
      emailEst: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "Email del Estudiante",
      },
      preCreEst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 150,
        comment: "Precio crédito Estudiante",
      },
      preTotEst: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
        comment: "Precio total semestre del Estudiante",
      },
    },
    {
      tableName: "estudiantes",
      timestamps: true,
      underscored: false,
    }
  );

  return Estudiante;
};
