import user from '../controllers/user';
import request from '../controllers/request';

export default (app) => {
	app.post('/auth/signup', user.signUp);
	app.post('/auth/login', user.logIn);

	app.get('/users/requests', request.allByUser);
	app.get('/users/requests/:requestId', request.aReq);
	app.post('/users/requests', request.create);
	app.put('/users/requests/:requestId', request.modify);

	app.get('/requests/', request.allReq);
	app.put('/requests/:requestId/approve', request.approve);
	app.put('/requests/:requestId/disapprove', request.disapprove);
	app.put('/requests/:requestId/resolve', request.resolve);
}
