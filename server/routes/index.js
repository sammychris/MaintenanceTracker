import user from '../controllers/user';

export default (app) => {
	app.post('/auth/signup', user.signUp);
	app.post('/auth/login', user.logIn);
}