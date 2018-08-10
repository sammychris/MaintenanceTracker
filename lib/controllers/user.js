'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userSchema = require('../models/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    signUp: function signUp(req, res) {
        var _req$body = req.body,
            firstname = _req$body.firstname,
            lastname = _req$body.lastname,
            email = _req$body.email,
            password = _req$body.password;

        var info = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            request: []
        };
        _userSchema2.default.db.push(info);
        return res.json(info);
    },
    logIn: function logIn(req, res) {
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password;

        var findUser = _userSchema2.default.db.find(function (v) {
            return v.email === email.toLowerCase();
        });
        if (!findUser) return res.send('user does not exist!');
        if (findUser.password !== password) return res.send('wrong password');
        return res.send('user logged in successful!');
    }
};