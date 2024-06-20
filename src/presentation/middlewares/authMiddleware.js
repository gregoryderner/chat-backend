const TokenService = require('../../application/services/TokenService');
const tokenService = new TokenService();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = tokenService.verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = authMiddleware;
