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
 * @extends PIXI.Text
 *
 * 
 */

var TextClip = function (_PIXI$Text) {
	_inherits(TextClip, _PIXI$Text);

	/**
  * @param {string} txt 
  * @param {object} style  {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'}
  */
	function TextClip() {
		var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var txt = arguments[2];
		var style = arguments[3];

		_classCallCheck(this, TextClip);

		var _this = _possibleConstructorReturn(this, (TextClip.__proto__ || Object.getPrototypeOf(TextClip)).call(this, txt, style));

		_this.x = _x;
		_this.y = _y;
		return _this;
	}

	return TextClip;
}(PIXI.Text);

exports.default = TextClip;
//# sourceMappingURL=TextClip.js.map