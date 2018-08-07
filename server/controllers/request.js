import request from '../models/requestSchema';

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
		request.db.push(userReq);
		res.json(userReq);

	},
	allReq(req, res){
		res.json({ request: request.db });
	}
}