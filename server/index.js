const express = require("express");
const path = require("path");
const config = require("./config");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UserModel = require("./models/user");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const rewardsRoute = require("./routes/rewardsRoute");
const usersRoute = require("./routes/usersRoute");
const authRequired = require("./middleware/authRequired");
const app = express();

const mongoose = require("mongoose");
const mongoDB =
  "mongodb://heroku_ls71pk2d:mru8v2efleiq8e8auncsblsbdi@ds159776.mlab.com:59776/heroku_ls71pk2d";
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use("/auth", authRoute);

app.use("/api/", authRequired, bodyParser.json(), morgan('tiny'));
app.use("/api/rewards", rewardsRoute);
app.use("/api/users", usersRoute);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
