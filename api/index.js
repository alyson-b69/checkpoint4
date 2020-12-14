const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);

const port = process.env.HTTP_PORT;
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/isAuthenticated");

const user = require("./routes/user.routes.js");
const subscribe = require("./routes/subscribe.routes.js");
const login = require("./routes/login.routes.js");
const building = require("./routes/building.routes.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(isAuthenticated);
app.use("/user", user);
app.use("/subscribe", subscribe);
app.use("/login", login);
app.use("/building", building);

server.listen(port, () => {
  console.info(`Server listening on port : ${port}`);
});
