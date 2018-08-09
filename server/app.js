import express from 'express';
import logger from 'morgan';
import route from './routes';


const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);


export default app;
