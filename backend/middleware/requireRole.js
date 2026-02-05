module.exports = function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.auth.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
