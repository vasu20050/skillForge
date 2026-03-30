// roleMiddleware ensures user has one of the allowed roles
exports.roleMiddleware = function(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    
    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

// Mode-based guard (e.g. for Earn Mode)
exports.isVerifiedEarner = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  
  if (req.user.mode_status !== 'verified_earner' && !req.user.roles.includes('admin')) {
    return res.status(403).json({ 
      message: 'Access Denied: You must be a verified earner to access this feature.',
      code: 'VERIFICATION_REQUIRED'
    });
  }
  next();
};

// Generic mode guard
exports.isMode = (...allowedModes) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!allowedModes.includes(req.user.mode_status)) {
      return res.status(403).json({ message: `Forbidden: Mode access denied (${req.user.mode_status})` });
    }
    next();
  };
};