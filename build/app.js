'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('dev'));

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use(_express2.default.static(_path2.default.join(__dirname, '../dist')));
app.use('/admin', _express2.default.static(_path2.default.join(__dirname, '../dist/admin')));

app.use((0, _cors2.default)());

(0, _routes2.default)(app);

app.get('/*', function (req, res) {
  return res.send('404 page not found!');
});
exports.default = app;