require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");
const estudianteRoutes = require("./routes/estudianteRoutes");
const profesorRoutes = require("./routes/profesorRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const materiaEstudianteRoutes = require("./routes/materiaEstudianteRoutes");
const config = require("./config/config");

const app = express();
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? config.development
    : config.production
);

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/profesor", profesorRoutes);
app.use("/api/materia", materiaRoutes);
app.use("/api/materia_estudiante", materiaEstudianteRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Database synchronized.");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
