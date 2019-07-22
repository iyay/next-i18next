"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _url = require("url");

var _redirectWithoutCache = _interopRequireDefault(require("./redirect-without-cache"));

var _default = function _default(req, res, lng) {
  var _parse = (0, _url.parse)(req.url),
      pathname = _parse.pathname,
      search = _parse.search;

  (0, _redirectWithoutCache["default"])(res, pathname.replace("/".concat(lng), "/".concat(lng, "/")) + (search || ''));
};

exports["default"] = _default;