const { getDatabase } = require("./repository/Repository");

const ScansController = require("./controllers/ScansController");
const express = require("express");
const config = require("./environments/environment.development.json");
const app = express();
const bodyParser = require("body-parser");
const { connectDatabase } = require("./dao/database");
const port = config.port;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  next();
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`0Barriers Backend listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error while setting up the database:", error);
  });

app.post("/scan", ScansController.createScan);
app.get("/scan", ScansController.getResults);
app.get("/score", ScansController.getAccessibilityScore);
