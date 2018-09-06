import { config } from 'dotenv';
import multer from 'multer';
import path from 'path';
import user from '../controllers/user';
import request from '../controllers/request';
import auth from '../middleware/authorize';


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../client/img/uploads'));
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`);
    },
});

const upload = multer({ storage });
config(); //  configuring my environmental variable
const { verifyUser, verifyAdmin } = auth;

export default (app) => {
    app.post('/auth/signup', user.signUp);
    app.post('/auth/login', user.logIn);
    app.put('/users/:id', user.update);

    app.get('/users/requests', verifyUser, request.allByUser);
    app.get('/users/requests/:requestId', verifyUser, request.aReq);
    app.post('/users/requests', verifyUser, request.create);
    app.put('/users/requests/:requestId', verifyUser, request.modify);

    app.get('/requests', verifyAdmin, request.allReq);
    app.put('/requests/:requestId/approve', verifyAdmin, request.approve);
    app.put('/requests/:requestId/disapprove', verifyAdmin, request.disapprove);
    app.put('/requests/:requestId/resolve', verifyAdmin, request.resolve);

    app.put('/users/profile/upload', upload.single('avatar'), user.upload);
    app.get('/users/profile', user.profile);
};
