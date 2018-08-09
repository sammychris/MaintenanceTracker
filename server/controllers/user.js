import user from '../models/userSchema';



export default {

	signUp(req, res){
		const { firstname, lastname, email, password }  = req.body;
		const info = {
					firstname: firstname,
					lastname: lastname,
					email   : email,
					password: password,
					request : []
			}
		user.db.push(info)
		res.json(info);
	},

	logIn(req, res){
		let { email, password} = req.body;
		let findUser = user.db.find((v) => v.email === email.toLowerCase());
		if(!findUser) return res.send('user does not exist!');
		if(findUser.password !== password) return res.send('wrong password');
		res.send('user logged in successful!');
	}
}