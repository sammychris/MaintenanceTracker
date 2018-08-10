'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import valid from './validator';


exports.default = {
    db: _user2.default
};