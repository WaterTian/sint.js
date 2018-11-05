'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

var _default = require('../fragments/default.vert');

var _default2 = _interopRequireDefault(_default);

var _dye = require('./dye.frag');

var _dye2 = _interopRequireDefault(_dye);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 */

var DyeColor = function (_PIXI$Filter) {
    _inherits(DyeColor, _PIXI$Filter);

    /**
     * @param {number} [alpha=1] Amount of alpha from 0 to 1, where 0 is transparent
     */
    function DyeColor() {
        var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

        _classCallCheck(this, DyeColor);

        var _this = _possibleConstructorReturn(this, (DyeColor.__proto__ || Object.getPrototypeOf(DyeColor)).call(this, _default2.default, _dye2.default));

        _this.alpha = alpha;
        _this.glShaderKey = 'alpha';
        return _this;
    }

    /**
     * Coefficient for alpha multiplication
     *
     * @member {number}
     * @default 1
     */


    _createClass(DyeColor, [{
        key: 'alpha',
        get: function get() {
            return this.uniforms.uAlpha;
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            this.uniforms.uAlpha = value;
        }
    }]);

    return DyeColor;
}(PIXI.Filter);

exports.default = DyeColor;
//# sourceMappingURL=DyeColor.js.map