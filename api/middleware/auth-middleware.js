const jwt=require("jsonwebtoken");
const {jwtSecret}=require('../../config/secret')

function generateToken(user) {
    const payload = {
      subject: user.user_id,
      username: user.username,
      
    };
    const options = {
      expiresIn: "1d",
    };
    return jwt.sign(payload, jwtSecret, options);
  }

  function restrict(req, res, next){
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json("token invalid");
        } else {
          req.decodedJwt = decoded;
          next();
        }
      });
    } else {
      res.status(401).json("token required");
    }
  }
  

  module.exports={restrict,generateToken}