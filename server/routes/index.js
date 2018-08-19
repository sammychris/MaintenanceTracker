import { config } from 'dotenv';
import user from '../controllers/user';
import request from '../controllers/request';
import auth from '../middleware/authorize';

config(); //  configuring my environmental variable
const { verifyUser, verifyAdmin } = auth;

export default (app) => {
    app.post('/auth/signup', user.signUp);
    app.post('/auth/login', user.logIn);

    app.get('/users/requests', request.allByUser, verifyUser);
    app.get('/users/requests/:requestId', request.aReq, verifyUser);
    app.post('/users/requests', request.create, verifyUser);
    app.put('/users/requests/:requestId', request.modify, verifyUser);

    app.get('/requests', request.allReq, verifyAdmin);
    app.put('/requests/:requestId/approve', request.approve, verifyAdmin);
    app.put('/requests/:requestId/disapprove', request.disapprove, verifyAdmin);
    app.put('/requests/:requestId/resolve', request.resolve, verifyAdmin);
};
