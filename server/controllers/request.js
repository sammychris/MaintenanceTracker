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
						status: "pending",
						description:description
				};
		const curUser = user.db.find((v) => `${v.firstname} ${v.lastname}` === name.toLowerCase());
		if(!curUser) return res.send({ error:'User does not exist' });
		request.db.push(userReq);
		curUser.request.push(userReq);
		res.json(userReq);

	},

	allReq(req, res){
		res.json({ requests: request.db });
	},

	all(req, res){
		res.json({ requests: request.db });
	},

	aReq(req, res){
		const { requestId } = req.params;
		const findReq = request.db[requestId];
		if(!findReq) return res.send({ error: "404 request id does not exists!"});
		res.json({request: findReq})
	},

	modify(req, res){
		const { requestId } = req.params;
		const findReq = request.db[requestId];
		if(!findReq) return res.send({ error: "404 request id does not exists!"});
		findReq.type = req.body.type;
		findReq.description = req.body.description;
		res.send({ updated:findReq });
	},

	approve(req, res){
	const { requestId } = req.params;
	const findReq = request.db[requestId];
	if(!findReq) return res.send({ error: "404 request id does not exists!"});
	if(findReq.status !== "pending") return res.send({ error: "request must be pending before approval!"});
	findReq.status = "approved";
	res.send({ approved: findReq });
	},

	disapprove(req, res){
	const { requestId } = req.params;
	const findReq = request.db[requestId];
	if(!findReq) return res.send({ error: "404 request id does not exists!"});
	if(findReq.status !== "pending") return res.send({ error: "request must be pending before disapproved!"});
	findReq.status = "disapproved";
	res.send({ disapproved: findReq });
	},

	resolve(req, res){
	const { requestId } = req.params;
	const findReq = request.db[requestId];
	if(!findReq) return res.send({ error: "404 request id does not exists!"});
	if(findReq.status !== "approved") return res.send({ error: "request must be approved before resolve!"});
	findReq.status = "resolved";
	res.send({ resolved: findReq });
	}
}
