const client = require("../client");
require('dotenv').config();

const clientOn = async (
    req,
    res,
    next
  ) => {
    const state = await client.getState()

    if (state != "CONNECTED")
       return res.status(500).send({ error: "Venom-bot not injetected" });
  
    next();
  };

  const isAuth = async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
  
    if (!apiKey || apiKey == "") return res.status(401).send();
  
    if (apiKey != process.env.APIKEY) return res.status(401).send();
  
    next();
  };

  const validadeNumber = async (
    req,
    res,
    next
  ) => {
    const { to } = req.body;
  
    if (to == null || to == undefined || to == "") {
      return res.status(400).send({
        error: {
          message: "Phone not valid",
          example: "556100000000@c.us",
        },
      });
    }
    if (to.length != 18)
      return res.status(400).send({
        error: {
          message: "Phone not valid",
          example: "556100000000@c.us",
        },
      });
  
    if (!to.includes("@c.us"))
      return res.status(400).send({
        error: {
          message: "Phone not valid",
          example: "556100000000@c.us",
        },
      });
  
    next();
  };

  module.exports = {clientOn,isAuth,validadeNumber};