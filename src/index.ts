import express from 'express';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middleware/error-middleware';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(router);

export const prismaClient = new PrismaClient();

app.use(errorMiddleware)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})