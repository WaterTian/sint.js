'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

require('pixi-spine');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 * @extends PIXI.Container
 *
 * 
 */

var SpineClip = function (_PIXI$spine$Spine) {
	_inherits(SpineClip, _PIXI$spine$Spine);

	/**
  * @param {string} name 
  */
	function SpineClip() {
		var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		var name = arguments[2];

		_classCallCheck(this, SpineClip);

		console.log(name);
		// console.log(PIXI.loader.resources[name]);

		var _this = _possibleConstructorReturn(this, (SpineClip.__proto__ || Object.getPrototypeOf(SpineClip)).call(this, SINT.TyLoader.resources[name].spineData));

		_this.x = _x;
		_this.y = _y;
		return _this;
	}

	_createClass(SpineClip, [{
		key: 'play',
		value: function play(name) {
			var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			this.state.setAnimation(0, name, loop);
		}
	}]);

	return SpineClip;
}(PIXI.spine.Spine);

exports.default = SpineClip;
//# sourceMappingURL=SpineClip.js.map