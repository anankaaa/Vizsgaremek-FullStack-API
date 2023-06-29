require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const port = process.env.PORT || 3000;
const app = require("./server");

//Database connection
if (!config.has("database")) {
  logger.error("No database config found.");
  process.exit();
}

//connecting MongoDB
const { username, password, host } = config.get("database");
mongoose
  .connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    logger.info("MongoDB connection has been establised successfully")
  )
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
