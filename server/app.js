import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import route from './routes';

config();
const app = express();
app.use(logger('dev'));


mongoose.connect(process.env.DB, { useNewUrlParser: true });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));
// app.use('/admin', express.static(path.join(__dirname, '../dist/admin')));

app.use(cors());

route(app);

app.get('/*', (req, res) => res.send('404 page not found!'));
export default app;
