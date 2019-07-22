"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCookie;

function getCookie(cookies, name) {
  var value = "; ".concat(cookies);
  var parts = value.split("; ".concat(name, "="));

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return false;
}