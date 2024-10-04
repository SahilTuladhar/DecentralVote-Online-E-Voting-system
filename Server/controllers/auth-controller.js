const jwt = require("jsonwebtoken");
const User= require("../models/User");
const cookieParser = require('cookie-parser');

const uuidv4 = require('uuid').v4
const sessions ={}


const auth = async (req, res, next) => {
  try {
  
      const authcookie = req.cookies.user_token
    
    
     
    if (!authcookie) {
      throw new Error("No token found");
    }
    const decoded = jwt.verify(authcookie, process.env.secret_key);
   
  
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": authcookie,
    });
    if (!user) {
      throw new Error("Seller not found");
    }
   
    req.token = authcookie;
    
    req.user = user;
   
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};



module.exports = auth