import express from 'express';
import dotenv from 'dotenv';
import {authRouter} from './routes/auth.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRouter)

app.listen(PORT, () =>{console.log(`server is running in port ${PORT}`)})