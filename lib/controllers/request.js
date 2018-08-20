'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestSchema = require('../models/requestSchema');

var _requestSchema2 = _interopRequireDefault(_requestSchema);

var _userSchema = require('../models/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updated = void 0;
exports.default = {
    create: function create(req, res) {
        var _req$body = req.body,
            type = _req$body.type,
            description = _req$body.description;

        var date = new Date();
        var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var fullDate = ' ' + currentDate + '/' + date.getMonth() + '/' + date.getFullYear() + ' ';
        var userReq = {
            date: fullDate,
            type: type,
            status: 'pending',
            description: description
        };
        var id = req.headers.id;

        var userById = _userSchema2.default.db[id];
        if (!userById) return res.status(404).send({ error: 'User does not exist' });
        userReq.name = userById.firstname + ' ' + userById.lastname;
        _requestSchema2.default.db.push(userReq);
        userById.request.push(userReq);
        return res.json({ message: 'Your request has been sent' });
    },
    allByUser: function allByUser(req, res) {
        var id = req.headers.id;

        var userById = _userSchema2.default.db[id];
        if (!userById) return res.status(404).send({ error: 'user does not exist!' });
        if (userById.request.length < 1) return res.status(400).send({ message: 'This user has made no request yet!' });
        return res.json({ requests: userById.request });
    },
    allReq: function allReq(req, res) {
        res.json({ requests: _requestSchema2.default.db });
    },
    aReq: function aReq(req, res) {
        var requestId = req.params.requestId;
        var id = req.headers.id;

        var userById = _userSchema2.default.db[id];
        var findReq = userById.request[requestId];
        if (!findReq) return res.status(401).send({ error: '404 request id does not exists!' });
        return res.json({ request: findReq });
    },
    modify: function modify(req, res) {
        if (updated) return res.status(400).send({ message: 'Oops! you have to wait for five minute before you can modify' });
        var requestId = req.params.requestId;
        var id = req.headers.id;

        var userById = _userSchema2.default.db[id];
        var findReq = userById.request[requestId];
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        findReq.type = req.body.type;
        findReq.description = req.body.description;
        setTimeout(function () {
            updated = false;
        }, 10000);
        updated = true;
        return res.send({ message: 'Updated successfully!', updated: updated });
    },
    approve: function approve(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.status(400).send({ error: 'request must be pending before approval!' });
        findReq.status = 'approved';
        return res.send({ approved: findReq });
    },
    disapprove: function disapprove(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.status(400).send({ error: 'request must be pending before disapproved!' });
        findReq.status = 'disapproved';
        return res.send({ disapproved: findReq });
    },
    resolve: function resolve(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.status(404).send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'approved') return res.status(400).send({ error: 'request must be approved before resolve!' });
        findReq.status = 'resolved';
        return res.send({ resolved: findReq });
    }
};