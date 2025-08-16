const jwt = require('jsonwebtoken');
module.exports.signToken = (user) =>
  jwt.sign({ id:user._id, role:user.role, email:user.email }, process.env.JWT_SECRET, { expiresIn:'7d' });
