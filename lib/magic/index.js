'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.doDye = doDye;
exports.doTwistFilter = doTwistFilter;
exports.doRadialBlurFilter = doRadialBlurFilter;

var _pixiFilters = require('pixi-filters');

var filters = _interopRequireWildcard(_pixiFilters);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _DyeColor = require('./dye/DyeColor');

var _DyeColor2 = _interopRequireDefault(_DyeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// export { default as DyeColor } from './dey/DyeColor';


/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 * @param {boolean} clear 
 */
function doDye(container, offset, radius, time) {
	var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

	var filter = new _DyeColor2.default(1);
	container.filters = [filter];
	_gsap2.default.to(filter, time, {
		alpha: 0,
		ease: Strong.easeInOut
	});
}

/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 * @param {boolean} clear 
 */
function doTwistFilter(container, offset, radius, time) {
	var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	var filter = new filters.TwistFilter(radius, 0);
	filter.offset.set(offset);
	var filter2 = new PIXI.filters.AlphaFilter();
	container.filters = [filter, filter2];
	_gsap2.default.to(filter, time, {
		angle: 10,
		ease: Strong.easeInOut
	});
	if (!clear) return;
	_gsap2.default.to(filter2, time * 0.7, {
		ease: Strong.easeInOut,
		alpha: 0,
		delay: time * 0.3,
		onComplete: function onComplete() {
			container.filters = [filter2];
			_gsap2.default.to(filter2, 1, {
				alpha: 1,
				onComplete: function onComplete() {
					container.filters = [];
				}
			});
		}
	});
}

/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 * @param {boolean} clear 
 */
function doRadialBlurFilter(container, offset, radius, time) {
	var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	var filter = new filters.RadialBlurFilter(0, offset, 9, radius);
	var filter2 = new PIXI.filters.AlphaFilter();
	container.filters = [filter, filter2];
	_gsap2.default.to(filter, time, {
		angle: 180,
		ease: Strong.easeInOut
	});
	if (!clear) return;
	_gsap2.default.to(filter2, time * 0.7, {
		ease: Strong.easeInOut,
		alpha: 0,
		delay: time * 0.3,
		onComplete: function onComplete() {
			container.filters = [filter2];
			_gsap2.default.to(filter2, 1, {
				alpha: 1,
				onComplete: function onComplete() {
					container.filters = [];
				}
			});
		}
	});
}
//# sourceMappingURL=index.js.map