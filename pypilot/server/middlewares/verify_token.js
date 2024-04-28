// middleware to verify jwt token from the auth_token header
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get the auth_token header
  const token = req.headers['auth_token'];
  
  console.log("token: ", token)
  console.log("")

  // Check for token

  if (!token) {
    return res.sendStatus(401).send("token validation failed"); // Unauthorized
  }

  jwt.verify(token, "CodeJudge", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};