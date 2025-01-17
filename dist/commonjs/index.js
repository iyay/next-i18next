"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _reactI18next = require("react-i18next");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _createConfig = _interopRequireDefault(require("./config/create-config"));

var _createI18nextClient = _interopRequireDefault(require("./create-i18next-client"));

var _hocs = require("./hocs");

var _utils = require("./utils");

var _components = require("./components");

var _router = require("./router");

var NextI18Next = function NextI18Next(userConfig) {
  (0, _classCallCheck2["default"])(this, NextI18Next);
  this.config = (0, _createConfig["default"])(userConfig);
  this.consoleMessage = _utils.consoleMessage.bind(this);
  /* Validation */

  if (this.config.otherLanguages.length <= 0) {
    throw new Error('To properly initialise a next-i18next instance you must provide one or more locale codes in config.otherLanguages.');
  }

  this.withNamespaces = function () {
    throw new Error('next-i18next has upgraded to react-i18next v10 - please rename withNamespaces to withTranslation.');
  };

  this.i18n = (0, _createI18nextClient["default"])(this.config);
  this.appWithTranslation = _hocs.appWithTranslation.bind(this);

  this.withTranslation = function (namespace, options) {
    return function (Component) {
      return (0, _hoistNonReactStatics["default"])((0, _reactI18next.withTranslation)(namespace, options)(Component), Component);
    };
  };

  var nextI18NextInternals = {
    config: this.config,
    i18n: this.i18n
  };
  this.Link = (0, _hocs.withInternals)(_components.Link, nextI18NextInternals);
  this.Router = (0, _router.wrapRouter)(nextI18NextInternals);
  /* Directly export `react-i18next` methods */

  this.Trans = _reactI18next.Trans;
  this.useTranslation = _reactI18next.useTranslation;
};

exports["default"] = NextI18Next;