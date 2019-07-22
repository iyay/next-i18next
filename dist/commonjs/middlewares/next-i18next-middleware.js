"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _url = require("url");

var _pathMatch = _interopRequireDefault(require("path-match"));

var _utils = require("../utils");

var _defaultConfig = require("../config/default-config");

var route = (0, _pathMatch["default"])();

function _default(nexti18next) {
  var config = nexti18next.config,
      i18n = nexti18next.i18n;
  var allLanguages = config.allLanguages,
      ignoreRoutes = config.ignoreRoutes,
      localeSubpaths = config.localeSubpaths;
  var ignoreRegex = new RegExp("^/(?!".concat(ignoreRoutes.map(function (x) {
    return x.replace('/', '');
  }).join('|'), ").*$"));
  var ignoreRoute = route(ignoreRegex);

  var isI18nRoute = function isI18nRoute(url) {
    return ignoreRoute(url);
  };

  var localeSubpathRoute = route("/:lng(".concat(allLanguages.join('|'), ")/*"));
  var middleware = []; // If not using server side language detection,
  // we need to manually set the language for
  // each request

  if (!config.serverLanguageDetection) {
    middleware.push(function (req, res, next) {
      if (isI18nRoute(req.url)) {
        req.lng = config.defaultLanguage;
      }

      next();
    });
  }

  middleware.push(_i18nextExpressMiddleware["default"].handle(i18n, {
    ignoreRoutes: ignoreRoutes
  }));

  if (localeSubpaths !== _defaultConfig.localeSubpathOptions.NONE) {
    middleware.push(function (req, res, next) {
      if (isI18nRoute(req.url)) {
        var _parse = (0, _url.parse)(req.url),
            pathname = _parse.pathname;

        if (allLanguages.some(function (lng) {
          return pathname === "/".concat(lng);
        })) {
          (0, _utils.forceTrailingSlash)(req, res, pathname.slice(1));
          return;
        }
      }

      next();
    });
    middleware.push(function (req, res, next) {
      if (isI18nRoute(req.url)) {
        var lngPathDetectorConfig = (0, _utils.lngPathDetector)(req);

        if (lngPathDetectorConfig.originalUrl !== lngPathDetectorConfig.correctedUrl) {
          (0, _utils.redirectWithoutCache)(res, lngPathDetectorConfig.correctedUrl);
          return;
        }
      }

      next();
    });
    middleware.push(function (req, res, next) {
      if (isI18nRoute(req.url)) {
        var params = localeSubpathRoute(req.url);

        if (params !== false) {
          var lng = params.lng;
          req.query = (0, _objectSpread2["default"])({}, req.query, {
            lng: lng
          });
          req.url = req.url.replace("/".concat(lng), '');
        }
      }

      next();
    });
  }

  return middleware;
}