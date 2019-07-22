"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req) {
  if (!req.i18n) {
    return null;
  }

  var _req$i18n$options = req.i18n.options,
      allLanguages = _req$i18n$options.allLanguages,
      defaultLanguage = _req$i18n$options.defaultLanguage,
      fallbackLng = _req$i18n$options.fallbackLng;
  var fallback = fallbackLng || defaultLanguage;

  if (!req.i18n.languages) {
    return fallback;
  }

  var language = req.i18n.languages.find(function (l) {
    return allLanguages.includes(l);
  }) || fallback;
  return language;
};

exports["default"] = _default;