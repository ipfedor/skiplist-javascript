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
	
	var _SkipListNode2 = __webpack_require__(2);
	
	var _SkipListNode3 = _interopRequireDefault(_SkipListNode2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.SkipList = _SkipList3.default;
	exports.SkipListNode = _SkipListNode3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _SkipListNode = __webpack_require__(2);
	
	var _SkipListNode2 = _interopRequireDefault(_SkipListNode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Nil = new _SkipListNode2.default(Infinity, null, 0);
	
	Object.defineProperty(Nil, 'next', {
	    configurable: false,
	    enumerable: false,
	    get: function get() {
	        throw new RangeError('Exceeded maximum range of skip list');
	    }
	});
	
	var SkipList = function () {
	    function SkipList(_ref) {
	        var _ref$headKey = _ref.headKey;
	        var headKey = _ref$headKey === undefined ? 0 : _ref$headKey;
	        var _ref$p = _ref.p;
	        var p = _ref$p === undefined ? 0.5 : _ref$p;
	        var _ref$maxLevel = _ref.maxLevel;
	        var maxLevel = _ref$maxLevel === undefined ? 16 : _ref$maxLevel;
	
	        _classCallCheck(this, SkipList);
	
	        this.levels = 1;
	        this.tail = Nil;
	
	        this.p = p;
	        this.maxLevel = maxLevel;
	        this.head = new _SkipListNode2.default(headKey, null, this.maxLevel);
	
	        for (var level = 0; level < this.levels; level++) {
	            this.head.next[level] = this.tail;
	        }
	    }
	
	    _createClass(SkipList, [{
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
	                entry = new _SkipListNode2.default(key, value, level);
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
	            _forEach(this, fn);
	        }
	    }, {
	        key: 'map',
	        value: function map(fn) {
	            var res = [];
	            _forEach(this, function (node) {
	                return res.push(fn(node));
	            });
	            return res;
	        }
	    }, {
	        key: 'reduce',
	        value: function reduce(fn, memo) {
	            _forEach(this, function (node) {
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
	
	function _forEach(list, fn) {
	    var node = list.head.next[0];
	    while (node != list.tail) {
	        fn(node);
	        node = node.next[0];
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SkipListNode = function SkipListNode(key, value, level) {
	    _classCallCheck(this, SkipListNode);
	
	    this.key = key;
	    this.value = value;
	    this.next = new Array(level);
	};
	
	exports.default = SkipListNode;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map