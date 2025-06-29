import { Router } from "express";
import { validateJobInput ,validateJobId } from '../middleware/validationMiddleware.js';
import {  CheckTestUser } from '../middleware/authMiddleware.js';
const router = Router();

import {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,  
} from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(validateJobInput,CheckTestUser, createJob);
router.route('/:id').get( validateJobId ,getJob).patch(validateJobId, validateJobInput,CheckTestUser, updateJob).delete(validateJobId,CheckTestUser, deleteJob);

export default router;