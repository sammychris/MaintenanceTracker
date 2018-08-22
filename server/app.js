import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import route from './routes';


const app = express();
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/admin', express.static(path.join(__dirname, '../dist/admin')));

app.use(cors());

route(app);

app.get('/*', (req, res) => res.send('404 page not found!'));
export default app;
