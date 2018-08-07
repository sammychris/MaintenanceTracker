import request from './db/request';
import user from './db/user';
import valid from './validator';



function schema(req, res, next) {

	const { firstname, lastname, email, password }  = req.body;

	valid.type(firstname,'string');
	valid.len(firstname, 3);

	valid.type(lastname,'string');
	valid.len(firstname, 3);

	valid.type(email,'string');
	valid.isMail(email);

	valid.type(password,'string');
	valid.len(password, 8);


	if(valid.error){
		return res.send( { error : valid.error, message: valid.message } );
	}

	const info = {
					firstname: firstname,
					lastname: lastname,
					email   : email,
					password: password,
					request : []
			}

	user.push(info);
}
