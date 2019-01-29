"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.L20nElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fluent = require("fluent");

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fsiCharacter = new RegExp(String.fromCharCode(8296), 'g');
var psiCharacter = new RegExp(String.fromCharCode(8297), 'g');

var L20n =
/*#__PURE__*/
function () {
  function L20n() {
    _classCallCheck(this, L20n);

    this.contexts = new Map();
    this.defaultLocale = 'en';
    this.fallbackToDefault = true;
  }

  _createClass(L20n, [{
    key: "load",
    value: function load(locale, ftl) {
      var ctx = this.contexts.get(locale);

      if (!ctx) {
        ctx = new _fluent.FluentBundle(locale);
        this.contexts.set(locale, ctx);
      }

      var errors = ctx.addMessages(ftl);

      if (errors.length) {
        console.log(errors);
      }
    }
  }, {
    key: "getRaw",
    value: function getRaw(key, props) {
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.defaultLocale;
      var ctx = this.contexts.get(locale);

      if (!ctx) {
        if (this.fallbackToDefault) {
          ctx = this.contexts.get(this.defaultLocale);
        }

        if (!ctx) {
          return "Locale '".concat(locale, "' missing");
        }
      }

      var template = ctx.getMessage(key);

      if (template != undefined && _typeof(template) === 'object') {
        template = ctx.format(template, props);
      }

      if (template == undefined || typeof template === 'undefined') {
        if (this.fallbackToDefault && !ctx.locales.includes(this.defaultLocale)) {
          return this.getRaw(key, props, this.defaultLocale);
        }

        return undefined;
      } else if (typeof template === 'string') {
        return template.replace(fsiCharacter, '').replace(psiCharacter, '');
      } else {
        var _formatted = formatted,
            _formatted2 = _slicedToArray(_formatted, 2),
            message = _formatted2[0],
            errors = _formatted2[1];

        if (errors.length > 0) {
          console.log(errors);
          return undefined;
        }

        return message.replace(fsiCharacter, '').replace(psiCharacter, '');
      }
    }
  }, {
    key: "get",
    value: function get(key, props) {
      var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.defaultLocale;
      var message = this.getRaw(key, props, locale);
      return _react.default.createElement(_react.default.Fragment, null, (0, _htmlReactParser.default)(message));
    }
  }, {
    key: "getContext",
    value: function getContext() {
      var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultLocale;
      var ctx = this.contexts.get(locale);

      if (!ctx) {
        if (this.fallbackToDefault) {
          ctx = this.contexts.get(this.defaultLocale);
        }

        if (!ctx) {
          return null;
        }
      }

      return ctx;
    }
  }]);

  return L20n;
}();

var L20nElement =
/*#__PURE__*/
function (_React$Component) {
  _inherits(L20nElement, _React$Component);

  function L20nElement(props) {
    _classCallCheck(this, L20nElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(L20nElement).call(this, props));
  }

  _createClass(L20nElement, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.attrs = Object.assign({}, this.props);
      delete this.attrs['id'];
      delete this.attrs['renderAs'];
      delete this.attrs['locale'];
      delete this.attrs['elementRef'];
      var value = l20n.getRaw(this.props.id, {}, this.props.locale);

      if (value) {
        this.attrs['defaultValue'] = value;
      }

      var ctx = l20n.getContext(this.props.locale);

      if (ctx) {
        var template = ctx.getMessage(this.props.id);

        if (template && template.attrs) {
          Object.entries(template.attrs).forEach(function (a) {
            _this.attrs[a[0]] = a[1];
          });
        }
      }

      return _react.default.createElement(this.props.renderAs, _extends({
        ref: this.props.elementRef
      }, this.attrs), this.props.children);
    }
  }]);

  return L20nElement;
}(_react.default.Component);

exports.L20nElement = L20nElement;
L20nElement.propTypes = {
  id: _propTypes.default.string.isRequired,
  renderAs: _propTypes.default.string.isRequired,
  locale: _propTypes.default.string
};
var l20n = new L20n();
var _default = l20n;
exports.default = _default;
