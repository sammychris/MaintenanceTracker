import SSEChannel from 'sse-pubsub';
import request from '../models/requestSchema';
import user from '../models/userSchema';

let updated;
const channel = new SSEChannel();


export default {
    create(req, res) {
        const { type, description } = req.body;
        const date = new Date();
        const currentDate = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
        const fullDate = ` ${currentDate}/${date.getMonth()}/${date.getFullYear()} `;
        const userReq = {
            id: `${request.db.length}`,
            date: fullDate,
            type,
            status: 'pending',
            description,
            sorting: Date.now(),
        };
        const { id } = req.headers;
        const userById = user.db.find(a => a.id === id);
        if (!userById) return res.status(404).send({ error: 'User does not exist' });
        userReq.name = `${userById.firstname} ${userById.lastname}`;
        request.db.push(userReq);
        userById.requestId.push(userReq.id);
        userReq.userPic = userById.profilePicSrc;
        channel.publish(userReq, 'myEvent'); // notifying admin...
        return res.json({ message: 'Your request has been sent' });
    },

    allByUser(req, res) {
        const { id } = req.headers;
        const userById = user.db.find(a => a.id === id);
        if (!userById) return res.status(404).send({ error: 'user does not exist!' });
        if (userById.requestId.length < 1) return res.status(400).send({ message: 'This user has made no request yet!' });
        userById.request = request.db.filter(a => userById.requestId.includes(a.id));
        return res.json({ requests: userById.request });
    },

    allReq(req, res) {
        res.json({ requests: request.db });
    },

    aReq(req, res) {
        const { requestId } = req.params;
        const findReq = request.db.find(a => a.id === requestId);
        if (!findReq) return res.status(401).send({ error: '404 request id does not exists!' });
        return res.json({ request: findReq });
    },

    modify(req, res) {
        if (updated) return res.status(400).send({ message: 'Oops! you have to wait for five minute before you can modify' });
        const { requestId } = req.params;
        const findReq = request.db.find(a => a.id === requestId);
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        findReq.type = req.body.type;
        findReq.description = req.body.description;
        setTimeout(() => { updated = false; }, 10000);
        updated = true;
        return res.send({ message: 'Updated successfully!', updated });
    },

    approve(req, res) {
        const { requestId } = req.params;
        const findReq = request.db.find(a => a.id === requestId);
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status.toLowerCase() !== 'pending') return res.status(400).send({ error: 'request must be pending before approval!' });
        findReq.status = 'accepted';
        return res.send({ accepted: findReq });
    },

    disapprove(req, res) {
        const { requestId } = req.params;
        const findReq = request.db.find(a => a.id === requestId);
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status.toLowerCase() !== 'pending') return res.status(400).send({ error: 'request must be pending before disapproved!' });
        findReq.status = 'rejected';
        return res.send({ rejected: findReq });
    },

    resolve(req, res) {
        const { requestId } = req.params;
        const findReq = request.db.find(a => a.id === requestId);
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status.toLowerCase() !== 'accepted') return res.status(400).send({ error: 'request must be approved before resolve!' });
        findReq.status = 'resolved';
        return res.send({ resolved: findReq });
    },

    notification(req, res) {
        return channel.subscribe(req, res);
    },
};
