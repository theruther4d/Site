(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = require('./Emitter.js');

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_Emitter) {
    _inherits(Clock, _Emitter);

    function Clock() {
        _classCallCheck(this, Clock);

        var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this));

        _this.running = false;
        _this._ticking = false;
        _this._startTime;
        _this._draw = _this._draw.bind(_this);
        return _this;
    }

    _createClass(Clock, [{
        key: '_draw',
        value: function _draw(timeStamp) {
            this._ticking = false;

            this.trigger('UPDATE');
            this.trigger('DRAW', timeStamp);

            if (this._events.length) {
                this._raf = requestAnimationFrame(this._draw);
            } else {
                this.stop();
            }
        }
    }, {
        key: '_requestTick',
        value: function _requestTick() {
            if (!this._ticking) {
                this._raf = requestAnimationFrame(this._draw);
            }

            this._ticking = true;
        }
    }, {
        key: 'start',
        value: function start() {
            this.running = true;
            this._requestTick();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            cancelAnimationFrame(this._raf);
        }
    }]);

    return Clock;
}(_Emitter3.default);

;

exports.default = Clock;

},{"./Emitter.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitter = function () {
    function Emitter() {
        _classCallCheck(this, Emitter);

        this._events = {};
    }

    _createClass(Emitter, [{
        key: '_hasEvent',
        value: function _hasEvent(eventName) {
            return eventName in this._events;
        }
    }, {
        key: 'on',
        value: function on(eventName, callBack) {
            if (this._hasEvent(eventName)) {
                this._events[eventName].push(callBack);
            } else {
                this._events[eventName] = [callBack];
            }

            return this;
        }
    }, {
        key: 'once',
        value: function once(eventName, callBack) {
            this.on(eventName, { cb: callBack });
        }
    }, {
        key: 'off',
        value: function off(eventName, callBack) {
            if (!this._hasEvent(eventName)) {
                return this;
            }

            var index = this._events[eventName].indexOf(callBack);

            if (index >= 0) {
                this._events[eventName].splice(index, 1);
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(eventName, data) {
            var _this = this;

            var onFinish = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

            if (!this._hasEvent(eventName)) {
                return;
            }

            this._events[eventName].map(function (callBack, idx) {
                if ((typeof callBack === 'undefined' ? 'undefined' : _typeof(callBack)) === 'object') {
                    callBack.cb(data);
                    _this._events[eventName].splice(idx, 1);
                } else {
                    callBack(data);
                }
            });

            onFinish();
        }
    }]);

    return Emitter;
}();

;

exports.default = Emitter;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clock = require('./Clock.js');

var _Clock2 = _interopRequireDefault(_Clock);

var _ScrollEmitter = require('./ScrollEmitter.js');

var _ScrollEmitter2 = _interopRequireDefault(_ScrollEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parallax = function () {
    function Parallax(_ref) {
        var resolver = _ref.resolver;
        var start = _ref.start;
        var end = _ref.end;

        _classCallCheck(this, Parallax);

        this._start = start;
        this._end = end;
        this._getDimensions();
        this._ticking = false;
        this._resolver = resolver;

        window.clock = window.clock || new _Clock2.default();
        window.scrollEmitter = window.scrollEmitter || new _ScrollEmitter2.default();

        this._onScroll = this._onScroll.bind(this);
        this._onUpdate = this._onUpdate.bind(this);
        this._onDraw = this._onDraw.bind(this);

        window.scrollEmitter.on('UPDATE', this._onScroll);
    }

    _createClass(Parallax, [{
        key: '_getDimensions',
        value: function _getDimensions() {
            // this.box = this.el.getBoundingClientRect();
            this.windowHeight = window.outerHeight || window.innerHeight;
            // this._start = Math.max( this.box.top - this.windowHeight, 0 );
            // this._end = this.box.bottom;
            this._from = 0;
            this._to = 1;
        }
    }, {
        key: '_onScroll',
        value: function _onScroll(scroll) {
            this._scroll = scroll;

            if (this._inView()) {

                if (!window.clock.running) {
                    window.clock.start();
                }

                if (!this._ticking) {
                    window.clock.once('UPDATE', this._onUpdate);
                    window.clock.once('DRAW', this._onDraw);

                    this._ticking = true;
                }
            }
        }
    }, {
        key: '_onUpdate',
        value: function _onUpdate() {
            // Calculate the value of our transform:
            this.progress = this._from + (this._to - this._from) / (this._end - this._start) * (this._scroll - this._start);
        }
    }, {
        key: '_onDraw',
        value: function _onDraw(timeStamp) {
            // Do the transform:
            this._resolver(this.progress);
            this._ticking = false;
        }
    }, {
        key: '_inView',
        value: function _inView() {
            return this._scroll + this.windowHeight >= this._start && this._scroll <= this._end;
        }
    }]);

    return Parallax;
}();

;

exports.default = Parallax;

},{"./Clock.js":1,"./ScrollEmitter.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = require('./Emitter.js');

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollEmitter = function (_Emitter) {
    _inherits(ScrollEmitter, _Emitter);

    function ScrollEmitter() {
        _classCallCheck(this, ScrollEmitter);

        var _this = _possibleConstructorReturn(this, (ScrollEmitter.__proto__ || Object.getPrototypeOf(ScrollEmitter)).call(this));

        _this._onScroll = _this._onScroll.bind(_this);
        _this._bindScrollListener();
        return _this;
    }

    _createClass(ScrollEmitter, [{
        key: '_onScroll',
        value: function _onScroll() {
            this.trigger('UPDATE', window.scrollY);
        }
    }, {
        key: '_bindScrollListener',
        value: function _bindScrollListener() {
            window.addEventListener('scroll', this._onScroll, false);
        }
    }]);

    return ScrollEmitter;
}(_Emitter3.default);

;

exports.default = ScrollEmitter;

},{"./Emitter.js":2}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parallax = require('./Parallax.js');

var _Parallax2 = _interopRequireDefault(_Parallax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = function () {
    return {
        initHeroParallax: function initHeroParallax() {
            var SLOW_FROM = 0;
            var SLOW_TO = -1000;
            var MEDIUM_FROM = 0;
            var MEDIUM_TO = -2000;
            var FAST_FROM = 0;
            var FAST_TO = -3000;

            var slow_val = void 0;
            var fast_val = void 0;
            var medium_val = void 0;

            var slowNodes = [].slice.apply(document.querySelectorAll('[data-parallax-speed=slow]'));
            var mediumNodes = [].slice.apply(document.querySelectorAll('[data-parallax-speed=medium]'));
            var fastNodes = [].slice.apply(document.querySelectorAll('[data-parallax-speed=fast]'));
            var slow = [];
            var medium = [];
            var fast = [];

            var ParallaxItem = function () {
                function ParallaxItem(node) {
                    _classCallCheck(this, ParallaxItem);

                    this._node = node;
                    this._style = this._node.style;
                }

                _createClass(ParallaxItem, [{
                    key: 'update',
                    value: function update(val) {
                        this._style.transform = 'translate3d( 0, ' + val.toFixed(2) + 'px, 0 )';
                    }
                }]);

                return ParallaxItem;
            }();

            ;

            slowNodes.map(function (node) {
                slow.push(new ParallaxItem(node));
            });

            mediumNodes.map(function (node) {
                medium.push(new ParallaxItem(node));
            });

            fastNodes.map(function (node) {
                fast.push(new ParallaxItem(node));
            });

            var updateItems = function updateItems(slowProg, mediumProg, fastProg) {
                slow.map(function (item) {
                    item.update(slowProg);
                });

                medium.map(function (item) {
                    item.update(mediumProg);
                });

                fast.map(function (item) {
                    item.update(fastProg);
                });
            };

            var ease = function ease(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };

            var header = document.getElementById('header');
            var parallax = new _Parallax2.default({
                start: 0,
                end: header.getBoundingClientRect().bottom,
                resolver: function resolver(progress) {
                    var slow_val = SLOW_FROM + (SLOW_TO - SLOW_FROM) / 1 * ease(progress);
                    var medium_val = MEDIUM_FROM + (MEDIUM_TO - MEDIUM_FROM) / 1 * ease(progress);
                    var fast_val = FAST_FROM + (FAST_TO - FAST_FROM) / 1 * ease(progress);
                    updateItems(slow_val, medium_val, fast_val);
                }
            });
        },

        init: function init() {
            main.initHeroParallax();
        }
    };
}();

main.init();

},{"./Parallax.js":3}]},{},[5])


//# sourceMappingURL=index.js.map
