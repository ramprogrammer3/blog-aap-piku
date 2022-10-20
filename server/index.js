const express = require("express");
const app = express();
const { PORT } = require("./config/envConfig");
const port = PORT || 8080;
const connect = require("./config/db");
const userRoutes = require("./router/userRoutes");
const cors = require('cors');

// mongodb database connection
connect();
app.use(cors());
app.use(express.json());
app.use("/",userRoutes);
app.listen(port, () => {
  console.log(`server is runnin on port ${port}`);
});
