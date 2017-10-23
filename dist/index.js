"use strict";

function isHostObject(t) {
  var o = !1;
  if (null != t && "function" != typeof t.toString) try {o = !!(t + "")} catch (t) {}
  return o
}

function overArg(t, o) {return function (e) {return t(o(e))}}

function isObjectLike(t) {return !!t && "object" == (void 0 === t ? "undefined" : _typeof(t))}

function isPlainObject(t) {
  if (!isObjectLike(t) || objectToString.call(t) != objectTag || isHostObject(t)) return !1;
  var o = getPrototype(t);
  if (null === o) return !0;
  var e = hasOwnProperty.call(o, "constructor") && o.constructor;
  return "function" == typeof e && e instanceof e && funcToString.call(e) == objectCtorString
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {return typeof t} : function (t) {return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t},
  objectTag = "[object Object]", funcProto = Function.prototype, objectProto = Object.prototype,
  funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty,
  objectCtorString = funcToString.call(Object), objectToString = objectProto.toString,
  getPrototype = overArg(Object.getPrototypeOf, Object), lodash_isplainobject = isPlainObject,
  _arguments = arguments, defaultOptions = { prefix: "", delimiter: "/" }, errors = {
    noargs: Error("Provide at least 2 strings as arguments"),
    namespaceOnly: Error("It's not enough to provide a namespace only"),
    types: TypeError("Namespace and short forms must be stings and options must be a plain object")
  }, actionTypes = function (t) {
    for (var o = arguments.length, e = Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) e[r - 1] = arguments[r];
    if ("string" != typeof t) throw errors.types;
    if (0 === _arguments.length) throw errors.noargs;
    if (1 === _arguments.length) throw errors.namespaceOnly;
    var n = e, i = defaultOptions, c = e.slice(0, -1), s = e[e.length - 1];
    if ("string" == typeof s) ; else {
      if (!lodash_isplainobject(s)) throw errors.types;
      n = c, i = Object.assign({}, defaultOptions, s)
    }
    var a = i, u = a.prefix, f = a.delimiter;
    return n.reduce(function (o, e) {
      var r = e.toUpperCase();
      return o.hasOwnProperty(r) || Object.defineProperty(o, r, {
        value: u + t + f + r,
        enumerable: !0
      }), o
    }, {})
  };
module.exports = actionTypes;
