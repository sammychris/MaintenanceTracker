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
    app.post('/auth/signin', user.signIn);
    // app.put('/users/:id', user.update);

    app.get('/users/requests', request.allByOneUser);
    app.get('/users/requests/:requestId', /* verifyUser, */ request.oneRequest);
    app.post('/users/requests', request.create);
    app.put('/users/requests/:requestId', /* verifyUser, */ request.modify);

    app.get('/requests', /* verifyAdmin, */ request.allRequest);
    // app.put('/requests/:requestId/approve', verifyAdmin, request.approve);
    // app.put('/requests/:requestId/disapprove', verifyAdmin, request.disapprove);
    // app.put('/requests/:requestId/resolve', verifyAdmin, request.resolve);

    // app.put('/users/profile/upload', upload.single('avatar'), user.upload);
    app.get('/users/:id', user.oneUser);
    app.get('/notifications', request.notification);
    // app.get('/users/:id/chats', user.usersChats);
};
