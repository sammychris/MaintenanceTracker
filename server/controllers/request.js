import request from '../models/requestSchema';
import user from '../models/userSchema';

export default {
	create(req, res){
		const { name, type, description } = req.body;
		const date = new Date();
		const currentDate = ( date.getDate() < 10 ) ? '0'+date.getDate(): date.getDate();
		let fullDate = ` ${currentDate}/${date.getMonth()}/${date.getFullYear()} `;
		const userReq = {
						name: name,
						date: fullDate,
						type: type,
						description:description
				};
		const curUser = user.db.find((v) => `${v.firstname} ${v.lastname}` === name.toLowerCase());
		if(!curUser) return res.send('User does not exist');
		request.db.push(userReq);
		curUser.request.push(userReq);
		res.json(userReq);

	},
	allReq(req, res){
		res.json({ requests: request.db });
	},
	aReq(req, res){
		res.json({})
	}
}