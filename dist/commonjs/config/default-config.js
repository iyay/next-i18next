"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.localeSubpathOptions = exports.isServer = void 0;

var _detectNode = _interopRequireDefault(require("detect-node"));

var isServer = _detectNode["default"] && !process.browser;
exports.isServer = isServer;
var localeSubpathOptions = {
  ALL: 'all',
  FOREIGN: 'foreign',
  NONE: 'none'
};
exports.localeSubpathOptions = localeSubpathOptions;
var DEFAULT_LANGUAGE = 'en';
var OTHER_LANGUAGES = [];
var DEFAULT_NAMESPACE = 'common';
var LOCALE_PATH = 'static/locales';
var LOCALE_STRUCTURE = '{{lng}}/{{ns}}';
var LOCALE_EXTENSION = 'json';
var LOCALE_SUBPATHS = localeSubpathOptions.ALL;
var config = {
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: OTHER_LANGUAGES,
  load: 'currentOnly',
  localePath: LOCALE_PATH,
  localeStructure: LOCALE_STRUCTURE,
  localeExtension: LOCALE_EXTENSION,
  localeSubpaths: LOCALE_SUBPATHS,
  use: [],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: function format(value, _format) {
      return _format === 'uppercase' ? value.toUpperCase() : value;
    }
  },
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  ignoreRoutes: ['/_next', '/static'],
  customDetectors: [],
  detection: {
    lookupCookie: 'next-i18next',
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie']
  },
  react: {
    wait: true,
    useSuspense: false
  },
  strictMode: true,
  errorStackTraceLimit: 0
};
var _default = config;
exports["default"] = _default;