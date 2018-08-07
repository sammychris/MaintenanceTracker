import user from '../controllers/user';
import request from '../controllers/request';

export default (app) => {
	app.post('/auth/signup', user.signUp);
	app.post('/auth/login', user.logIn);

	app.get('/users/requests', request.allReq);
	app.post('/users/requests', request.create);
}