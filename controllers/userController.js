// import { StatusCodes } from 'http-status-codes';
// import User from '../models/UserModel.js';
// import Job from '../models/JobModel.js';
// import cloudinary from 'cloudinary'
// import { promises as fs } from 'fs';
// // import cloudinary from '../utils/cloudinary.js';
// export const getCurrentUser = async (req, res) => {
//   const user = await User.findOne({ _id: req.user.userId }).select('-password ');
//     // const userWithoutPassword = user.toJSON();

//   res.status(StatusCodes.OK).json({ user });
// };

// export const getApplicationStats = async (req, res) => {
//   const users = await User.countDocuments();
//   const jobs = await Job.countDocuments();
//   res.status(StatusCodes.OK).json({ users, jobs });
// };

// export const updateUser = async (req, res) => {
//   const newUser= {...req.body};
//   delete newUser.password;
//   if(req.file){
//     console.log('req.file:', req.file);
//     const response  =await cloudinary.v2.uploader.upload(req.file.path);
//       console.log('Cloudinary response:', response);
//     await fs.unlink(req.file.path);
//     newUser.avatar = response.secure_url;
//     newUser.avatarId = response.public_id;
//      console.log('Cloudinary secure_url:', response.secure_url);
//       console.log('Cloudinary public_id:', response.public_id);

//   }
//       console.log('req.file:', req.file);
     
//   console.log(newUser);
// const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, { new: true });
// console.log(updatedUser);
//    if(req.file && updatedUser.avatarId){
//     await cloudinary.v2.uploader.destroy(updatedUser.avatarId);
//   }
//   res.status(StatusCodes.OK).json({ msg: 'user updated' });
// };


import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;
  const userId = req.user.userId;

  const newUserData = { name, lastName, email, location };

  // Get the old user first
  const oldUser = await User.findById(userId);

  if (req.file) {
    console.log('req.file:', req.file);

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path);
    console.log('Cloudinary response:', cloudinaryResponse);

    // Clean up uploaded file
    await fs.unlink(req.file.path);

    // Update new avatar data
    newUserData.avatar = cloudinaryResponse.secure_url;
    newUserData.avatarId = cloudinaryResponse.public_id;
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });

  // Delete old image if new one uploaded
  if (req.file && oldUser.avatarId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarId);
  }

  res.status(StatusCodes.OK).json({ msg: 'User updated successfully', user: updatedUser });
};
