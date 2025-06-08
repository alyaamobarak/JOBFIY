import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/customErrors.js';
// import { validateTest } from '../middleware/validationMiddleware.js';
// let jobs = [
//   { id: nanoid(), company: 'apple', position: 'front-end developer' },
//   { id: nanoid(), company: 'google', position: 'back-end developer' },
// ];

export const getAllJobs =async (req, res) => {
  const jobs=await Job.find({ createdBy: req.user.userId });
   console.log(req.user);
  res.status(StatusCodes.OK).json({ jobs});
};

export const createJob = async (req, res) => {
  // const { company, position } = req.body;
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  
};
// export const createJob = async (req,res)=>{
//  const {company,position}= req.body;

//   if (!company || !position) {
//     return res.status(400).json({ msg: 'Company and position are required' });
//   }
//   const job={id:nanoid(),company,position};
//   jobs.push(job);
//   res.status(200).json({job});
// }

export const  getJob = async (req, res) => {
  const { id } = req.params;
  const job =await Job.findById(id)
  // const job = jobs.find((job) => job.id === id);
  // if (!job) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ job });
}


export const updateJob = async (req, res) => {
  // const {company,position} = req.body;
  // if (!company || !position) {
  //   return res.status(400).json({ msg: 'Company and position are required' });
  // }
  const {id}=req.params;
  const jobUpdated =await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  // if (!jobUpdated) throw new NotFoundError(`no job with id ${id}`);
 
  res.status(StatusCodes.OK).json({ msg: 'job modified', jobUpdated });
}

export const deleteJob = async (req, res) => {
  const {id} = req.params;
  const jobIndex = await Job.findByIdAndDelete(id);
  // const jobIndex = jobs.findIndex((job) => job.id === id);
  // if (jobIndex === -1) throw new NotFoundError(`no job with id ${id}`);
//  const  newJobs = jobs.filter((job) => job.id !== id);
//   jobs = newJobs;
  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
}
