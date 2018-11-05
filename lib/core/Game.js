'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

require('pixi-sound');

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _vconsole = require('vconsole');

var _vconsole2 = _interopRequireDefault(_vconsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

PIXI.utils.skipHello();

/**
 * @class
 * @extends PIXI.Application
 * 
 * @param {object} config The Game options
 * @param {domElement} [config.domElement] 
 * @param {string} [config.initWidth] The Game width
 * @param {string} [config.initHeight] The Game height
 * @param {boolean} [config.showFPS]
 */

var Game = function (_PIXI$Application) {
	_inherits(Game, _PIXI$Application);

	function Game(config, loading, create) {
		_classCallCheck(this, Game);

		if (config === undefined) {
			config = {};
		};

		config = Object.assign({
			domElement: null,
			initWidth: 750,
			initHeight: 1334,
			showFPS: true, // 显示帧频
			backgroundColor: 0x000000, // 画布背景色
			assets: {}
		}, config);

		var _this2 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, {
			width: config.initWidth,
			height: config.initHeight,
			backgroundColor: config.backgroundColor
		}));

		PIXI.settings.PRECISION_FRAGMENT = 'highp';

		_this2.domElement = config.domElement;
		_this2.initWidth = config.initWidth;
		_this2.initHeight = config.initHeight;

		_this2.domElement.appendChild(_this2.view);

		if (config.showFPS) {
			_this2.stats = new _stats2.default();
			_this2.domElement.appendChild(_this2.stats.dom);
			_this2.vconsole = new _vconsole2.default();
		}

		/// assets load
		SINT.TyLoader = new PIXI.loaders.Loader();
		for (var key in config.assets) {
			SINT.TyLoader.add(key, config.assets[key]);
		}
		SINT.TyLoader.onProgress.add(function (_e) {
			// console.log("onProgress " + _e.progress);
			if (loading) loading(_e.progress);
		});

		var _this = _this2;
		SINT.TyLoader.load(function (loader, resources) {
			console.log("loadComplete");
			if (create) create();
		});

		_this2.init();
		return _this2;
	}

	_createClass(Game, [{
		key: 'init',
		value: function init() {
			var initWidth = this.initWidth,
			    initHeight = this.initHeight;

			// Handle window resize event

			window.addEventListener('resize', this.resize.bind(this));
			this.resize();

			// Handle fish animation
			this.ticker.add(this.animate, this);
		}
	}, {
		key: 'resize',
		value: function resize() {

			var _c = this.domElement.offsetWidth / this.initWidth;
			console.log("resize " + _c);

			// for bottom render bug
			this.initHeight = this.domElement.offsetHeight / _c;

			this.view.style.transform = "matrix(" + _c + ", 0, 0, " + _c + ", 0, 0)";
			this.view.style.transformOrigin = "0% 0%";

			this.renderer.resize(this.initWidth, this.initHeight);
			this.render();
		}

		/**
   * Adds one or more children to the stage.
   *
   * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
   * @return {PIXI.DisplayObject} The first child that was added.
   */

	}, {
		key: 'add',
		value: function add(child) {
			this.stage.addChild(child);
			return child;
		}

		/**
   * Remove child from stage.
   *
   * @param {...PIXI.DisplayObject} child - The DisplayObject(s) to add to the container
   */

	}, {
		key: 'remove',
		value: function remove(child) {
			this.stage.removeChild(child);
		}

		/**
   * Animate
   * @param {number} delta - % difference in time from last frame render
   */

	}, {
		key: 'animate',
		value: function animate(delta) {

			if (this.stats) this.stats.update();

			// this.animateTimer += delta;
			// const { animateTimer} = this;
			// this.events.emit('animate', delta, animateTimer);
			// if (!this.animating) {
			//     return;
			// }
		}

		/**
   * must be loaded
   * @param {String} name - sound name
   *
   * PIXI.sound.pause(name);
   * PIXI.sound.pauseAll();
   * 
   * PIXI.sound.remove(name);
   * PIXI.sound.removeAll();
   * 
   * PIXI.sound.stop(name);
   * PIXI.sound.stopAll();
   * 
   * PIXI.sound.volume(name, volume);
   */

	}, {
		key: 'playSound',
		value: function playSound(name) {
			var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var _sound = SINT.TyLoader.resources[name].sound;
			_sound.loop = loop;
			_sound.play();
		}

		/**
   * Destroy and don't use after this.
   */

	}, {
		key: 'removeThis',
		value: function removeThis() {
			if (this.stats) this.domElement.removeChild(this.stats.dom);
			if (this.vconsole) this.vconsole.destroy();

			console.log('removeThis');

			////Hook 
			var domBtns = document.getElementsByTagName("button");
			for (var i = 0; i < domBtns.length; i++) {
				var domBtn = domBtns[i];
				// console.log(domBtn);
				if (domBtn.title = 'HOOK DIV') {
					document.body.removeChild(domBtn);
				}
			}

			this.destroy(true);

			PIXI.sound.removeAll();

			// console.log(SINT.TyLoader.resources);

			for (var key in SINT.TyLoader.resources) {
				var resource = SINT.TyLoader.resources[key];
				// console.log(resource);
				var tex = resource.texture;
				if (tex) tex.destroy(true);
				var texs = resource.textures;
				if (texs) {
					for (var _key in texs) {
						texs[_key].destroy(true);
					}
				}
			}

			SINT.TyLoader.destroy();
			// SINT.TyLoader.removeAllListeners();
			// SINT.TyLoader.reset();
			// console.log(SINT.TyLoader.resources);
		}
	}]);

	return Game;
}(PIXI.Application);

exports.default = Game;
//# sourceMappingURL=Game.js.map