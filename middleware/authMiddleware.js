import { UnauthenticatedError ,UnauthorizedError, BadRequestError} from '../errors/customErrors.js';
import { verifyToken } from '../utils/tokenUtils.js';

export const authenticateUser =  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new UnauthenticatedError('Authentication invalid');
    
    try {
        const { userId, role } = verifyToken(token);
        const testUser =userId=='68605419252a1d9a11b2f39e';
        req.user = { userId, role, testUser };
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

export const CheckTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
}