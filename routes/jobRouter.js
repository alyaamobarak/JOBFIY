import { Router } from "express";
import { validateJobInput ,validateJobId } from '../middleware/validationMiddleware.js';

const router = Router();

import {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,  
} from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router.route('/:id').get( validateJobId ,getJob).patch(validateJobId, validateJobInput, updateJob).delete(validateJobId, deleteJob);

export default router;