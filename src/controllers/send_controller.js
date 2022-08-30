const client = require("../client");

const sendMessage = async (req, res) => {
    const { to, message } = req.body;
  
    if (!to || !message || to == "" || message == "") {
      res.status(400).send();
      return;
    }
    try {
      await client.sendMessage(to,message);
      
      res.status(201).send({});
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const checkNumber = async (req, res) => {
    const { to } = req.body;
  
    if (to == "")
      return res.status(400).send();
  
    try {
      await client.getNumberId(to)
      .then((value) => {
        if(value != null){
          res.status(201).send({"status":"REGISTERED"});
        }else{
          res.status(201).send({"status":"NOT REGISTERED"});
        }
        
    }).catch(() => {
      res.status(400).send({});
    });
    } catch (error) {
      res.status(500).send(error);
    }
  };

module.exports = {sendMessage,checkNumber};