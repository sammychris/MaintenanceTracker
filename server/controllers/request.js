import request from '../models/requestSchema';
import user from '../models/userSchema';

export default {
    create(req, res) {
        const { type, description } = req.body;
        const date = new Date();
        const currentDate = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
        const fullDate = ` ${currentDate}/${date.getMonth()}/${date.getFullYear()} `;
        const userReq = {
            date: fullDate,
            type,
            status: 'pending',
            description,
        };
        const { id } = req.headers;
        const userById = user.db[id];
        if (!userById) return res.send({ error: 'User does not exist' });
        userReq.name = `${userById.firstname} ${userById.lastname}`;
        request.db.push(userReq);
        userById.request.push(userReq);
        return res.json({ message: 'Your request has been sent' });
    },

    allByUser(req, res) {
        const { id } = req.headers;
        const userById = user.db[id];
        if (!userById) return res.send({ error: 'user does not exist!' });
        if (userById.request.length < 1) return res.send({ message: 'This user has made no request yet!' });
        return res.json({ requests: userById.request });
    },

    allReq(req, res) {
        res.json({ requests: request.db });
    },

    aReq(req, res) {
        const { requestId } = req.params;
        const findReq = request.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        return res.json({ request: findReq });
    },

    modify(req, res) {
        const { requestId } = req.params;
        const findReq = request.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        findReq.type = req.body.type;
        findReq.description = req.body.description;
        return res.send({ updated: findReq });
    },

    approve(req, res) {
        const { requestId } = req.params;
        const findReq = request.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.send({ error: 'request must be pending before approval!' });
        findReq.status = 'approved';
        return res.send({ approved: findReq });
    },

    disapprove(req, res) {
        const { requestId } = req.params;
        const findReq = request.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.send({ error: 'request must be pending before disapproved!' });
        findReq.status = 'disapproved';
        return res.send({ disapproved: findReq });
    },

    resolve(req, res) {
        const { requestId } = req.params;
        const findReq = request.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'approved') return res.send({ error: 'request must be approved before resolve!' });
        findReq.status = 'resolved';
        return res.send({ resolved: findReq });
    },
};
