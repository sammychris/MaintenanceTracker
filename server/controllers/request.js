import SSEChannel from 'sse-pubsub';
import Request from '../models/requestSchema';

// let updated;
const channel = new SSEChannel();


export default {
    create(req, res) {
        const { type, description, user } = req.body;
        new Request({ type, description, user })
            .save((err, result) => {
                if (err) return res.status(404).send(err);
                channel.publish(result, 'myEvent'); // notifying admin...
                return res.json({
                    message: 'Your request has been sent',
                    success: true,
                });
            });
    },

    allByOneUser(req, res) {
        const { user } = req.headers;
        Request.find({ user })
            .populate('user') // only when you need the user info...
            .exec((err, result) => {
                if (err) return res.send(err);
                return res.json(result);
            });
    },

    allRequest(req, res) {
        Request.find({}, (err, result) => {
            if (err) return res.send(err);
            return res.json(result);
        });
    },

    oneRequest(req, res) {
        const { requestId } = req.params;
        Request.findById(requestId, (err, result) => {
            if (err) return res.status(401).send(err);
            return res.json({ result, success: true });
        });
    },

    modify(req, res) {
        console.log(req.body);
        const { requestId } = req.params;
        const { type, description, status } = req.body;
        Request.findById(requestId, (err, data) => {
            if (err) res.send(err);
            /* eslint-disable no-param-reassign */
            data.type = type || data.type;
            data.description = description || data.description;
            data.status = status || data.status;
            data.save((er) => {
                if (er) return res.send(err);
                return res.json({ message: 'You request has been updated', success: true });
            });
        });
    },

    // approve(req, res) {
    //     const { requestId } = req.params;
    //     // const findReq = request.db.find(a => a.id === requestId);
    //     // if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
    //     // if (findReq.status.toLowerCase() !== 'pending') return res.status(400).send({ error: 'request must be pending before approval!' });
    //     // findReq.status = 'accepted';
    //     // return res.send({ accepted: findReq });
    //     Request.findById(requestId, (err, result) => {

    //     });
    // },

    // disapprove(req, res) {
    //     const { requestId } = req.params;
    //     const findReq = request.db.find(a => a.id === requestId);
    //     if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
    //     if (findReq.status.toLowerCase() !== 'pending') return res.status(400).send({ error: 'request must be pending before disapproved!' });
    //     findReq.status = 'rejected';
    //     return res.send({ rejected: findReq });
    // },

    // resolve(req, res) {
    //     const { requestId } = req.params;
    //     const findReq = request.db.find(a => a.id === requestId);
    //     if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
    //     if (findReq.status.toLowerCase() !== 'accepted') return res.status(400).send({ error: 'request must be approved before resolve!' });
    //     findReq.status = 'resolved';
    //     return res.send({ resolved: findReq });
    // },

    notification(req, res) {
        return channel.subscribe(req, res);
    },
};
