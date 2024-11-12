module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define(
    "Materia",
    {
      codIntMat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomMat: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      creMat: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      codProf: {
        type: DataTypes.INTEGER,
        references: {
          model: "Profesor",
          key: "codIntProf",
        },
      },
    },
    {
      tableName: "materias",
      timestamps: true,
      underscored: false,
    }
  );

  return Materia;
};
