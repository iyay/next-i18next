"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaultConfig = require("../config/default-config");

var _default = function _default(nextI18NextInternals, lng) {
  var _nextI18NextInternals = nextI18NextInternals.config,
      defaultLanguage = _nextI18NextInternals.defaultLanguage,
      localeSubpaths = _nextI18NextInternals.localeSubpaths;

  if (lng) {
    if (localeSubpaths === _defaultConfig.localeSubpathOptions.NONE) {
      return false;
    }

    if (localeSubpaths === _defaultConfig.localeSubpathOptions.FOREIGN && lng !== defaultLanguage) {
      return true;
    }

    if (localeSubpaths === _defaultConfig.localeSubpathOptions.ALL) {
      return true;
    }
  }

  return false;
};

exports["default"] = _default;