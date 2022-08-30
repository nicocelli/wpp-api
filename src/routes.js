const express = require("express");
const { sendMessage ,checkNumber} = require("./controllers/send_controller");
const {clientOn,validadeNumber,isAuth} = require("./middlewares/middleware");

require('dotenv').config();

const routes = express.Router();

routes.get("/", (req, res) => {
    res.json({ "oi": "oi" })
});

routes.post("/send-message",clientOn,isAuth,validadeNumber,sendMessage);
routes.post("/check-number", clientOn,isAuth,validadeNumber,checkNumber);

module.exports = routes;
