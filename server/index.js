import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './routes/auth.js'

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRouter)



app.get('/', async (req, res) => res.send('Hello'))

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cnml8oe.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    );

    app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
