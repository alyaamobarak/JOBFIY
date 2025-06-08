import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword ,comperedPass} from '../utils/passwordHashed.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createToken } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  // first registered user is an admin
  const isFirstAccount= (await User.countDocuments())===0;
   req.body.role = isFirstAccount ? 'admin' : 'user';

  //  const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // req.body.password = hashedPassword;
   const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

    const user = await User.create(req.body );
    res.status(StatusCodes.CREATED).json({ msg:'user created succssfully', user });
};

export const login = async (req, res) => {
  const user = await User.findOne({email:req.body.email})
  const isValidUser =user && (await comperedPass(req.body.password,user.password))
  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
  const token = createToken({ userId: user._id, role: user.role });
        // res.json({"token":token});
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie('token',token,{
          httpOnly:true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === 'production',
        })
        res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });

};



export const logout = async (req, res) => {
  res.cookie('token',  'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
}