const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./db");
const app = express();
module.exports = app;

// Body parsing middleware
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Allow all requests from the Netlify app
const netlifyCorsOptions = {
  origin: "https://kryptovest.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(netlifyCorsOptions));
// app.use(cors());

// Include our routes!
app.use("/api/user", require("./api/user"));

// Sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/client/index.html"));
});

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Server port
const PORT = process.env.PORT || 1337;
const init = () => {
  try {
    sequelize.sync().catch((error) => console.error(error));
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
