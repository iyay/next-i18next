"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lngFromReq = _interopRequireDefault(require("./lng-from-req"));

var _defaultConfig = require("../config/default-config");

var _cookie = _interopRequireDefault(require("./cookie"));

var _default = function _default(req) {
  var config = {
    originalUrl: req.url,
    correctedUrl: req.url
  };

  if (req.i18n) {
    var language = (0, _lngFromReq["default"])(req);
    var _req$i18n$options = req.i18n.options,
        allLanguages = _req$i18n$options.allLanguages,
        defaultLanguage = _req$i18n$options.defaultLanguage,
        localeSubpaths = _req$i18n$options.localeSubpaths;
    var languageChanged = false;
    var languageNeedsSubpath = localeSubpaths === _defaultConfig.localeSubpathOptions.FOREIGN && language !== defaultLanguage || localeSubpaths === _defaultConfig.localeSubpathOptions.ALL;
    /*
      If a user has hit a subpath which does not
      match their language, give preference to
      the path, and change user language.
    */

    allLanguages.forEach(function (lng) {
      if (req.url.startsWith("/".concat(lng, "/")) && language !== lng) {
        req.i18n.changeLanguage(lng);
        languageChanged = true;
      }
    });
    /*
      If a language subpath is required and
      not present, remove all other potential
      subpaths and then prepend correct subpath
    */

    if (!languageChanged && languageNeedsSubpath && !req.url.startsWith("/".concat(language, "/"))) {
      allLanguages.forEach(function (otherLng) {
        if (req.url.startsWith("/".concat(otherLng, "/"))) {
          config.correctedUrl = req.url.replace("/".concat(otherLng, "/"), '/');
        }
      });
      var tld = (0, _cookie["default"])(req.headers.cookie, 'tld');

      if (tld && currentLanguage !== tld) {
        config.correctedUrl = req.url.replace('/', "/".concat(language, "/"));
      }
    }
    /*
      If a user has a default language prefix
      in their URL, and config option isn't
      set to ALL, strip it.
    */


    if (language === defaultLanguage && req.url.startsWith("/".concat(defaultLanguage, "/")) && localeSubpaths !== _defaultConfig.localeSubpathOptions.ALL) {
      config.correctedUrl = req.url.replace("/".concat(defaultLanguage, "/"), '/');
    }
  }

  return config;
};

exports["default"] = _default;