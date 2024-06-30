"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var flattenObject = function flattenObject(userObject) {
  var flattened = {};
  Object.keys(userObject).forEach(function (key) {
    var value = userObject[key];
    if (_typeof(value) === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });
  return flattened;
};
var flattenArrayObjects = function flattenArrayObjects(collection) {
  var flattenedArray = [];
  flattenedArray = collection.map(function (item) {
    return flattenObject(item.toJSON());
  });
  return flattenedArray;
};
module.exports = {
  flattenObject: flattenObject,
  flattenArrayObjects: flattenArrayObjects
};