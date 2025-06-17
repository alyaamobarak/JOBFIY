import mongoose from 'mongoose';
import {JOB_STATUS, JOB_TyPES, JOB_SORTED_BY} from '../utils/constants.js';

const JobSchema = new mongoose.Schema({
    company:String,
    position: String,
   
    jobStatus: {
  type: String,
  enum: ['pending', 'interview', 'declined'],
  default: 'pending',
},
    jobType: {
        type: String,
        // enum: ['full-time', 'part-time', 'remote'],
        // default: 'full-time'
        enum:Object.values(JOB_TyPES),
        default: JOB_TyPES.FULL_TIME
    },
    location: {
      type: String,
      default: 'my city',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
},
{
    timestamps: true,
});

  export default mongoose.model('Job', JobSchema);
