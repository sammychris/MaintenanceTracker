'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('./db/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import valid from './validator';

exports.default = {
    db: _request2.default
};