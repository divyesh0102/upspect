"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewport = void 0;

var React = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _defaultTheme = require("tailwindcss/defaultTheme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useViewport = function useViewport() {
  var queries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultTheme.screens;

  var _React$useState = React.useState({
    currentWidth: getWindowWidth(),
    currentHeight: getWindowHeight(),
    isMobileDevice: isMobileDevice(),
    activeBreakpoint: undefined
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      viewportSize = _React$useState2[0],
      setViewportSize = _React$useState2[1];

  React.useEffect(function () {
    var b; // breakpoint

    var handleResize = function handleResize() {
      var w = getWindowWidth();
      /**
       * Evaluates `min` against the current screen width.
       *
       * @param  {String} min Min breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */

      var min = function min(_min, k) {
        _min = (0, _lodash.parseInt)(_min, 10);
        b = w >= _min ? k : b;
      };
      /**
       * Evaluates `max` against the current screen width.
       *
       * @param  {String} max Max breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */


      var max = function max(_max, k) {
        _max = (0, _lodash.parseInt)(_max, 10);
        b = w <= _max ? k : b;
      };
      /**
       * Evaluates `min` and `max` against the current screen width.
       *
       * @param  {String} min Min breakpoint value
       * @param  {String} max Max breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */


      var rng = function rng(min, max, k) {
        min = (0, _lodash.parseInt)(min, 10);
        max = (0, _lodash.parseInt)(max, 10);
        b = w >= min && w <= max ? k : b;
      };
      /**
       * Evaluates compound media query against the current screen width.
       *
       * @param  {Object} q Min/max breakpoint values
       * @param  {String} k Key of breakpoint in query object
       * @return {String}   Key of active breakpoint
       */


      var mlt = function mlt(q, k) {
        if (q.min && !q.max) min(q.min, k);
        if (!q.min && q.max) max(q.max, k);
        if (q.min && q.max) rng(q.min, q.max, k);
      };

      (0, _lodash.each)(queries, function (v, k) {
        if ((0, _lodash.isString)(v)) {
          // min
          min(v, k);
        }

        if ((0, _lodash.isPlainObject)(v)) {
          // max
          (0, _lodash.each)(v, function () {
            return mlt(v, k);
          });
        }

        if ((0, _lodash.isArray)(v)) {
          // multi-range
          (0, _lodash.each)(v, function (o) {
            return (0, _lodash.each)(o, function () {
              return mlt(o, k);
            });
          });
        }
      });
      setViewportSize({
        currentWidth: getWindowWidth(),
        currentHeight: getWindowHeight(),
        isMobileDevice: isMobileDevice(),
        activeBreakpoint: b
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return viewportSize;
};

exports.useViewport = useViewport;

function getWindowWidth() {
  return typeof window !== 'undefined' ? isMobileAgent() ? window.screen.width : window.innerWidth : 0;
}

function getWindowHeight() {
  return typeof window !== 'undefined' ? isMobileAgent() ? window.screen.height : window.innerHeight : 0;
}

function isMobileAgent() {
  return typeof navigator !== 'undefined' ? /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) : false;
}

function isMobileDimensions(width) {
  return width < 769;
}

function isMobileDevice() {
  return isMobileAgent() || isMobileDimensions(getWindowWidth());
}