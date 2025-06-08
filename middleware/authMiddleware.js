import { UnauthenticatedError ,UnauthorizedError} from '../errors/customErrors.js';
import { verifyToken } from '../utils/tokenUtils.js';

export const authenticateUser =  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new UnauthenticatedError('Authentication invalid');
    
    try {
        const { userId, role } = verifyToken(token);
        req.user = { userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};


export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};