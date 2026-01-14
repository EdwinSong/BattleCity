// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Enhanced version of Closure's base.js for Blockly.
 * @provideGoog
 */

/**
 * @define {boolean} Overridden to true by the compiler.
 */
var COMPILED = false;

var goog = goog || {};

// Blockly需要的全局对象
goog.define = goog.define || function(name, value) {
  window[name] = value;
  return value;
};

goog.provide = goog.provide || function(name) {
  let obj = window;
  const parts = name.split('.');
  for (const part of parts) {
    obj[part] = obj[part] || {};
    obj = obj[part];
  }
};

goog.require = goog.require || function() {};

goog.requireType = goog.requireType || function() {};

// 继承功能
goog.inherits = goog.inherits || function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};

// 类型检查
goog.isNull = goog.isNull || function(val) {
  return val === null;
};

goog.isDef = goog.isDef || function(val) {
  return val !== undefined;
};

goog.isDefAndNotNull = goog.isDefAndNotNull || function(val) {
  return val !== undefined && val !== null;
};

goog.isObject = goog.isObject || function(val) {
  return val !== null && typeof val === 'object';
};

goog.isString = goog.isString || function(val) {
  return typeof val === 'string';
};

goog.isNumber = goog.isNumber || function(val) {
  return typeof val === 'number';
};

goog.isBoolean = goog.isBoolean || function(val) {
  return typeof val === 'boolean';
};

goog.isFunction = goog.isFunction || function(val) {
  return typeof val === 'function';
};

// 数组操作
goog.array = goog.array || {};

goog.array.forEach = goog.array.forEach || function(arr, func, opt_obj) {
  for (let i = 0; i < arr.length; i++) {
    func.call(opt_obj, arr[i], i, arr);
  }
};

goog.array.map = goog.array.map || function(arr, func, opt_obj) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res[i] = func.call(opt_obj, arr[i], i, arr);
  }
  return res;
};

goog.array.filter = goog.array.filter || function(arr, func, opt_obj) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (func.call(opt_obj, arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }
  return res;
};

goog.array.indexOf = goog.array.indexOf || function(arr, elem, opt_fromIndex) {
  const fromIndex = opt_fromIndex || 0;
  for (let i = fromIndex; i < arr.length; i++) {
    if (arr[i] === elem) {
      return i;
    }
  }
  return -1;
};

// 对象操作
goog.object = goog.object || {};

goog.object.create = goog.object.create || function() {
  return Object.create(null);
};

goog.object.extend = goog.object.extend || function(target, var_args) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

goog.object.getValues = goog.object.getValues || function(obj) {
  const values = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

// 字符串操作
goog.string = goog.string || {};

goog.string.camelCase = goog.string.camelCase || function(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
};

goog.string.capitalize = goog.string.capitalize || function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// DOM操作
goog.dom = goog.dom || {};

goog.dom.createElement = goog.dom.createElement || function(tagName) {
  return document.createElement(tagName);
};

goog.dom.appendChild = goog.dom.appendChild || function(parent, child) {
  return parent.appendChild(child);
};

goog.dom.removeNode = goog.dom.removeNode || function(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
};

// 事件
goog.events = goog.events || {};
goog.events.EventType = {
  CLICK: 'click',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEMOVE: 'mousemove',
  MOUSEENTER: 'mouseenter',
  MOUSELEAVE: 'mouseleave',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
  CHANGE: 'change',
  INPUT: 'input',
  BLUR: 'blur',
  FOCUS: 'focus',
  SUBMIT: 'submit',
  SCROLL: 'scroll',
  RESIZE: 'resize',
  LOAD: 'load',
  UNLOAD: 'unload',
  ERROR: 'error'
};

goog.events.listen = goog.events.listen || function(src, type, listener, opt_capture, opt_handler) {
  const capture = opt_capture || false;
  src.addEventListener(type, listener, capture);
  return {
    src: src,
    type: type,
    listener: listener,
    capture: capture
  };
};

goog.events.unlisten = goog.events.unlisten || function(src, type, listener, opt_capture) {
  const capture = opt_capture || false;
  src.removeEventListener(type, listener, capture);
};

goog.events.removeAll = goog.events.removeAll || function(src, opt_type) {
  // 简化实现
};

// 样式
goog.style = goog.style || {};

goog.style.setStyle = goog.style.setStyle || function(element, style, value) {
  if (goog.isObject(style)) {
    for (const key in style) {
      if (Object.prototype.hasOwnProperty.call(style, key)) {
        element.style[goog.string.camelCase(key)] = style[key];
      }
    }
  } else {
    element.style[goog.string.camelCase(style)] = value;
  }
};

// 坐标
goog.math = goog.math || {};

goog.math.Coordinate = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

// 矩形
goog.math.Rect = function(left, top, width, height) {
  this.left = left || 0;
  this.top = top || 0;
  this.width = width || 0;
  this.height = height || 0;
};

// Blockly需要的常量
goog.userAgent = goog.userAgent || {};
goog.userAgent.TOUCH_ENABLED = false;

// 注册功能
goog.registry = goog.registry || {
  register: function(id, type, obj) {
    if (!this.registryMap_) {
      this.registryMap_ = {};
    }
    if (!this.registryMap_[type]) {
      this.registryMap_[type] = {};
    }
    this.registryMap_[type][id] = obj;
  },
  getObject: function(id, type) {
    return this.registryMap_ && this.registryMap_[type] && this.registryMap_[type][id];
  }
};
