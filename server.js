import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import appError from './controllers/errorController.mjs';
import passportConfig from './config/passportConfig.mjs';
import authRoutes from './routes/authRoutes.mjs';
import secretRoutes from './routes/secretRoutes.mjs';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(passport.initialize());
passportConfig(passport);

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/secret', secretRoutes);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can not find ${req.originalUrl}`,
  });
});

app.use(appError);

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
