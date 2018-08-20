'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _request = require('../controllers/request');

var _request2 = _interopRequireDefault(_request);

var _authorize = require('../middleware/authorize');

var _authorize2 = _interopRequireDefault(_authorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)(); //  configuring my environmental variable
var verifyUser = _authorize2.default.verifyUser,
    verifyAdmin = _authorize2.default.verifyAdmin;

exports.default = function (app) {
    app.post('/auth/signup', _user2.default.signUp);
    app.post('/auth/login', _user2.default.logIn);

    app.get('/users/requests', verifyUser, _request2.default.allByUser);
    app.get('/users/requests/:requestId', verifyUser, _request2.default.aReq);
    app.post('/users/requests', verifyUser, _request2.default.create);
    app.put('/users/requests/:requestId', verifyUser, _request2.default.modify);

    app.get('/requests', verifyAdmin, _request2.default.allReq);
    app.put('/requests/:requestId/approve', verifyAdmin, _request2.default.approve);
    app.put('/requests/:requestId/disapprove', verifyAdmin, _request2.default.disapprove);
    app.put('/requests/:requestId/resolve', verifyAdmin, _request2.default.resolve);
};