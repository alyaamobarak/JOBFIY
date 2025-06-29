import 'express-async-errors';
import express from "express";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import { nanoid } from "nanoid";
import mongoose from 'mongoose';
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import  errorHandlerMiddleware  from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import cloudinary from 'cloudinary';

//public images
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import path from 'path'

dotenv.config();
const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/jobs',authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
// app.get("/api/v1/jobs", )
// app.patch('/api/v1/jobs/:id', );
// app.delete('/api/v1/jobs/:id', )
// app.post('/api/v1/jobs',)
// app.get('/api/v1/jobs/:id', );

//
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.get("/",(req,res)=>{
    res.send("Hello, World!");
})

// app.use((req, res, next) => {
//   console.log('Cookies:', req.cookies);
//   next();
// });

app.use(('*'), (req, res) => {
    res.status(404).json({ msg: 'Route not found' });
});

app.use(errorHandlerMiddleware);
app.use(express.static(path.resolve(__dirname,'./public')))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

try {
  await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected successfully')
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}