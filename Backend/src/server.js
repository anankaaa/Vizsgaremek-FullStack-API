const express = require("express");
const app = express();
const logger = require("./config/logger");
const cors = require("cors"); //for development purposes
const { join } = require("path");
const authenticateJWT = require("./auth/authenticate");
const adminAuth = require("./auth/adminOnly");
const authHandler = require("./auth/authHandler");

//swagger 1
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

const userRouter = require("./controllers/user/userRoutes");
const successRouter = require("./controllers/success/successRoutes");
const dogRouter = require("./controllers/dog/dogRoutes");
const aidRouter = require("./controllers/aid/aidRoutes");

const angularPath = join(__dirname, "..", "public", "angular");

app.use(express.json());

const apiWrapper = express();
apiWrapper.use("/api", app);

//for development purposes
//app.use(cors());

app.post("/login", authHandler.login);
app.post("/refresh", authHandler.refresh);
app.post("/logout", authHandler.logout);

app.use("/dogs", dogRouter);

app.get("/aid/:id", authenticateJWT);
app.use("/aid", aidRouter);

app.use("/success", successRouter);

app.use("/users", authenticateJWT, adminAuth, userRouter);

apiWrapper.use("/", express.static(angularPath));
apiWrapper.get("*", (req, res) => {
  res.sendFile(angularPath + "/index.html");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Error-handling
app.use((err, req, res, next) => {
  logger.error(`ERROR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

//for development purposes
//module.exports = app;
module.exports = apiWrapper;
