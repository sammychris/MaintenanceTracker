import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import route from './routes';


const app = express();
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../UI`));
app.use(cors());

route(app);

app.get('/*', (req, res) => res.send('welcome'));
export default app;
