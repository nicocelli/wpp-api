
const express = require("express");
require('dotenv').config()

const client = require("./client");
const routes = require("./routes");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(routes);

app.listen(process.env.PORT, async () => {
    console.log(`listening at the door ${process.env.PORT}`);
  
    await client.initialize();
});

