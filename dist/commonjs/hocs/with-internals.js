"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(WrappedComponent, config) {
  var withInternals =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2["default"])(withInternals, _React$Component);

    function withInternals() {
      (0, _classCallCheck2["default"])(this, withInternals);
      return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(withInternals).apply(this, arguments));
    }

    (0, _createClass2["default"])(withInternals, [{
      key: "render",
      value: function render() {
        return _react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, this.props, {
          nextI18NextInternals: config
        }));
      }
    }]);
    return withInternals;
  }(_react["default"].Component);

  withInternals.displayName = "withnextI18NextInternals(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
  return withInternals;
};

exports["default"] = _default;