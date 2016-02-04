(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["skiplist"] = factory();
	else
		root["skiplist"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SkipListNode = exports.SkipList = undefined;
	
	var _SkipList2 = __webpack_require__(1);
	
	var _SkipList3 = _interopRequireDefault(_SkipList2);
	
	var _SkipListNode2 = __webpack_require__(7);
	
	var _SkipListNode3 = _interopRequireDefault(_SkipListNode2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.SkipList = _SkipList3.default;
	exports.SkipListNode = _SkipListNode3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(3);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _SkipListNode = __webpack_require__(7);
	
	var _SkipListNode2 = _interopRequireDefault(_SkipListNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SkipList = function () {
	    function SkipList() {
	        var headKey = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var tailKey = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];
	        var p = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];
	        var maxLevel = arguments.length <= 3 || arguments[3] === undefined ? 16 : arguments[3];
	        (0, _classCallCheck3.default)(this, SkipList);
	
	        this.levels = 1;
	        this.p = p;
	        this.maxLevel = maxLevel;
	        this.head = this.createNode(headKey, null, this.maxLevel);
	        this.tail = this.createNode(tailKey, null, 0);
	        Object.defineProperty(this.tail, 'next', {
	            configurable: false,
	            enumerable: false,
	            get: function get() {
	                throw new RangeError('Exceeded maximum range of skip list');
	            }
	        });
	        for (var level = 0; level < this.levels; level++) {
	            this.head.next[level] = this.tail;
	        }
	    }
	
	    (0, _createClass3.default)(SkipList, [{
	        key: 'createNode',
	        value: function createNode(key, value, level) {
	            return new _SkipListNode2.default(key, value, level);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            var node = this.head;
	            for (var level = this.levels - 1; level > -1; level--) {
	                while (node.next[level].key < key) {
	                    node = node.next[level];
	                }
	                if (node.next[level].key === key) {
	                    return node.next[level];
	                }
	            }
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            return this.get(key) !== void 0;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            if (typeof key !== 'number') {
	                throw new TypeError('SkipList requires numeric key but received: ' + String(key));
	            }
	            var node = this.head;
	            var update = new Array(this.levels);
	            for (var level = this.levels - 1; level > -1; level--) {
	                while (node.next[level].key < key) {
	                    node = node.next[level];
	                }
	                update[level] = node;
	            }
	            node = node.next[0];
	            var entry = undefined;
	            if (node.key === key) {
	                node.value = value;
	                entry = node;
	            } else {
	                var level = randomLevel(this.p, this.levels);
	                if (level === this.levels) {
	                    if (this.levels < this.maxLevel) {
	                        this.levels++;
	                        this.head.next[level] = this.tail;
	                    }
	                    update.push(this.head);
	                }
	                entry = this.createNode(key, value, level);
	                for (var i = 0; i <= level; i++) {
	                    entry.next[i] = update[i].next[i];
	                    update[i].next[i] = entry;
	                }
	            }
	            return entry;
	        }
	    }, {
	        key: 'unset',
	        value: function unset(key) {
	            var node = this.head;
	            var update = new Array(this.levels);
	            for (var level = this.levels - 1; level > -1; level--) {
	                while (node.next[level].key < key) {
	                    node = node.next[level];
	                }
	                update[level] = node;
	            }
	            node = node.next[0];
	            if (node === this.tail) {
	                return;
	            }
	            for (var level = 0; level < this.levels; level++) {
	                if (update[level].next[level] !== node) {
	                    break;
	                } else {
	                    update[level].next[level] = node.next[level];
	                }
	            }
	            while (this.levels > 1 && this.head.next[this.levels - 1] === this.tail) {
	                this.levels--;
	            }
	        }
	    }, {
	        key: 'before',
	        value: function before(key) {
	            var node = this.head;
	            for (var level = this.levels - 1; level > -1; level--) {
	                while (node.next[level].key < key) {
	                    node = node.next[level];
	                }
	            }
	            return node;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(fn) {
	            var node = this.head.next[0];
	            while (node !== this.tail) {
	                fn(node);
	                node = node.next[0];
	            }
	        }
	    }, {
	        key: 'map',
	        value: function map(fn) {
	            var res = [];
	            this.forEach(function (node) {
	                return res.push(fn(node));
	            });
	            return res;
	        }
	    }, {
	        key: 'reduce',
	        value: function reduce(fn, memo) {
	            this.forEach(function (node) {
	                return memo = fn(node);
	            });
	            return memo;
	        }
	    }]);
	    return SkipList;
	}();
	
	exports.default = SkipList;
	
	function randomLevel(p, maxLevel) {
	    var level = 0;
	    while (Math.random() < p && level < maxLevel) {
	        level++;
	    }
	    return level;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(4);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SkipListNode = function SkipListNode(key, value, level) {
	    (0, _classCallCheck3.default)(this, SkipListNode);
	
	    this.key = key;
	    this.value = value;
	    this.next = new Array(level);
	};
	
	exports.default = SkipListNode;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map