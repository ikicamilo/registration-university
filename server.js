require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./sequelize");

const estudianteRoutes = require("./routes/estudianteRoutes");
const profesorRoutes = require("./routes/profesorRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const materiaEstudianteRoutes = require("./routes/materiaEstudianteRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/estudiante", estudianteRoutes);
app.use("/api/profesor", profesorRoutes);
app.use("/api/materia", materiaRoutes);
app.use("/api/materia_estudiante", materiaEstudianteRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `The route ${req.originalUrl} does not exist on this server.`,
  });
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  V1SwaggerDocs(app, process.env.PORT);
});
