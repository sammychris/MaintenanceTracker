'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _request = require('../controllers/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.post('/auth/signup', _user2.default.signUp);
    app.post('/auth/login', _user2.default.logIn);

    app.get('/users/requests', _request2.default.allByUser);
    app.get('/users/requests/:requestId', _request2.default.aReq);
    app.post('/users/requests', _request2.default.create);
    app.put('/users/requests/:requestId', _request2.default.modify);

    app.get('/requests/', _request2.default.allReq);
    app.put('/requests/:requestId/approve', _request2.default.approve);
    app.put('/requests/:requestId/disapprove', _request2.default.disapprove);
    app.put('/requests/:requestId/resolve', _request2.default.resolve);
};