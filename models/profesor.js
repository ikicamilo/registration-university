module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define(
    "Profesor",
    {
      codIntProf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomProf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apelProf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailProf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "profesores",
      timestamps: true,
      underscored: false,
    }
  );

  Profesor.associate = (models) => {
    Profesor.hasMany(models.Materia, {
      foreignKey: "codProf",
      as: "materias",
    });
  };

  return Profesor;
};
