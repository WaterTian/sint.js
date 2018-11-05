'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 * @extends PIXI.extras.AnimatedSprite
 *
 * 
 */

var AnimatedClip = function (_PIXI$extras$Animated) {
	_inherits(AnimatedClip, _PIXI$extras$Animated);

	/**
  * @param {string} name 
  */
	function AnimatedClip() {
		var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var name = arguments[2];
		var startNum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

		_classCallCheck(this, AnimatedClip);

		var sheet = SINT.TyLoader.resources[name].textures;
		// console.log(sheet);

		var textures = [];
		var num = startNum;
		for (var key in sheet) {
			var texture = PIXI.Texture.fromFrame(name + num + '.png');
			textures.push(texture);
			num++;
		}

		var _this = _possibleConstructorReturn(this, (AnimatedClip.__proto__ || Object.getPrototypeOf(AnimatedClip)).call(this, textures));

		_this.x = _x;
		_this.y = _y;
		return _this;
	}

	return AnimatedClip;
}(PIXI.extras.AnimatedSprite);

exports.default = AnimatedClip;
//# sourceMappingURL=AnimatedClip.js.map