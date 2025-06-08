import { body, validationResult } from "express-validator";
import { BadRequestError ,NotFoundError, UnauthorizedError,} from "../errors/customErrors.js";
import mongoose from 'mongoose';
import { param } from 'express-validator';
import {JOB_TyPES, JOB_STATUS} from "../utils/constants.js";
import Job from "../models/JobModel.js";
import User from '../models/UserModel.js'
const  validationError = (validationValues)=>{

    return [
        validationValues,
        (req,res,next)=>{
           const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
          if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
        }
    ]
}

// export const validateTest = validationError([
//   body('name')
//     .notEmpty()
//     .withMessage('name is required')
//     .isLength({ min: 3, max: 50 })
//     .withMessage('name must be between 3 and 50 characters long')
//     .trim(),
// ]);

export const validateJobInput = validationError([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('location').notEmpty().withMessage(' location is required'),
    body('jobType').notEmpty().withMessage('jobType is required').isIn(Object.values(JOB_TyPES)).withMessage(`jobType must be one of ${Object.values(JOB_TyPES).join(', ')}`),
    body('jobStatus')
        .notEmpty()
        .withMessage('jobStatus is required')
        .isIn(Object.values(JOB_STATUS))
        .withMessage(`jobStatus must be one of ${Object.values(JOB_STATUS).join(', ')}`),


]);

export const validateJobId = validationError([
  param('id').custom(async (value, {req}) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isJobOwner = job.createdBy.toString() === req.user.userId;
    if (!isAdmin && !isJobOwner) {
      throw new UnauthorizedError('not authorized to access this job');
    }
  }),
]);


export const validateRegisterUser = validationError([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) => {
const user = await User.findOne({ email });
      if (user) throw new BadRequestError('email already exists');
    }),
  body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must be at least 8 characters long'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('location').notEmpty().withMessage('location is required'),
  
])



export const validateLoginUser = validationError([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);


export const validateUpdateUserInput = validationError([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);