'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TextClip = exports.AnimatedClip = exports.SpriteClip = exports.SpineClip = exports.TweenMax = exports.Magic = exports.Unit = exports.CONST = exports.Game = undefined;

var _Game = require('./core/Game');

var _Game2 = _interopRequireDefault(_Game);

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _Unit = require('./Unit');

var Unit = _interopRequireWildcard(_Unit);

var _magic = require('./magic/');

var Magic = _interopRequireWildcard(_magic);

var _SpineClip = require('./core/SpineClip');

var _SpineClip2 = _interopRequireDefault(_SpineClip);

var _SpriteClip = require('./core/SpriteClip');

var _SpriteClip2 = _interopRequireDefault(_SpriteClip);

var _AnimatedClip = require('./core/AnimatedClip');

var _AnimatedClip2 = _interopRequireDefault(_AnimatedClip);

var _TextClip = require('./core/TextClip');

var _TextClip2 = _interopRequireDefault(_TextClip);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Game = _Game2.default;
exports.CONST = _const2.default;
exports.Unit = Unit;
exports.Magic = Magic;
exports.TweenMax = _gsap2.default;
exports.SpineClip = _SpineClip2.default;
exports.SpriteClip = _SpriteClip2.default;
exports.AnimatedClip = _AnimatedClip2.default;
exports.TextClip = _TextClip2.default;

//	TOOLS

global.SINT = Object.assign(global.PIXI, exports);
//# sourceMappingURL=sint.js.map