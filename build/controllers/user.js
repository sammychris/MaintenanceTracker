'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userSchema = require('../models/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

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
        var userSecret = process.env.USER_KEY;
        _jsonwebtoken2.default.sign(info, userSecret, { expiresIn: '1h' }, function (err, token) {
            if (err) return console.log(err);
            _userSchema2.default.db.push(info);
            return res.status(201).json({ message: 'successfully registered!', token: token });
        });
    },
    logIn: function logIn(req, res) {
        var idByIndex = void 0;
        var adminSecret = process.env.ADMIN_KEY;
        var userSecret = process.env.USER_KEY;
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password,
            admin = _req$body2.admin;

        var findUser = _userSchema2.default.db.find(function (e, i) {
            idByIndex = i;
            return e.email === email.toLowerCase();
        });
        if (!findUser) return res.send({ error: 'user does not exist!' });
        if (findUser.password !== password) return res.send({ error: 'wrong password' });
        var secretKey = admin && findUser.role ? adminSecret : userSecret;
        _jsonwebtoken2.default.sign(findUser, secretKey, { expiresIn: '1h' }, function (err, token) {
            if (err) return console.log(err);
            return res.status(202).send({
                message: 'loggedin successfully', token: token, id: idByIndex, user: findUser
            });
        });
        return console.log(idByIndex);
    }
};