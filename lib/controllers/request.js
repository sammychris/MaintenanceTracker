'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestSchema = require('../models/requestSchema');

var _requestSchema2 = _interopRequireDefault(_requestSchema);

var _userSchema = require('../models/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    create: function create(req, res) {
        var _req$body = req.body,
            name = _req$body.name,
            type = _req$body.type,
            description = _req$body.description;

        var date = new Date();
        var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var fullDate = ' ' + currentDate + '/' + date.getMonth() + '/' + date.getFullYear() + ' ';
        var userReq = {
            name: name,
            date: fullDate,
            type: type,
            status: 'pending',
            description: description
        };
        var curUser = _userSchema2.default.db.find(function (v) {
            return v.firstname + ' ' + v.lastname === name.toLowerCase();
        });
        if (!curUser) return res.send({ error: 'User does not exist' });
        _requestSchema2.default.db.push(userReq);
        curUser.request.push(userReq);
        return res.json(userReq);
    },
    allByUser: function allByUser(req, res) {
        var id = req.headers.id;

        var userById = _userSchema2.default.db[id];
        if (!userById) return res.send({ error: 'user does not exist!' });
        if (userById.request.length < 1) return res.send({ message: 'This user has made no request yet!' });
        return res.json({ requests: userById.request });
    },
    allReq: function allReq(req, res) {
        res.json({ requests: _requestSchema2.default.db });
    },
    aReq: function aReq(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        return res.json({ request: findReq });
    },
    modify: function modify(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        findReq.type = req.body.type;
        findReq.description = req.body.description;
        return res.send({ updated: findReq });
    },
    approve: function approve(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.send({ error: 'request must be pending before approval!' });
        findReq.status = 'approved';
        return res.send({ approved: findReq });
    },
    disapprove: function disapprove(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'pending') return res.send({ error: 'request must be pending before disapproved!' });
        findReq.status = 'disapproved';
        return res.send({ disapproved: findReq });
    },
    resolve: function resolve(req, res) {
        var requestId = req.params.requestId;

        var findReq = _requestSchema2.default.db[requestId];
        if (!findReq) return res.send({ error: '404 request id does not exists!' });
        if (findReq.status !== 'approved') return res.send({ error: 'request must be approved before resolve!' });
        findReq.status = 'resolved';
        return res.send({ resolved: findReq });
    }
};