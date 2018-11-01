import * as filters from 'pixi-filters';
import TweenMax from "gsap";

// import { default as DyeColor } from './dey/DyeColor';


/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 */
export function doTwistFilter(container, offset, radius, time) {
	let filter = new filters.TwistFilter(radius, 0);
	filter.offset.set(offset);
	container.filters = [filter];

	TweenMax.to(filter, time, {
		angle: 10,
		ease:Strong.easeInOut,
		// onComplete: () => {
		// 	container.filters = [];
		// 	filter = null;
		// }
	})
}

/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 */
export function doRadialBlurFilter(container, offset, radius, time) {
	let filter = new filters.RadialBlurFilter(0, offset, 7, radius);

	let filter2 = new PIXI.filters.AlphaFilter();

	container.filters = [filter,filter2];
	TweenMax.to(filter, time, {
		angle: 180,
		ease:Strong.easeInOut,
		// onComplete: () => {
		// 	container.filters = [];
		// 	filter = null;
		// }
	})
	TweenMax.to(filter2, time, {
		ease:Strong.easeInOut,
		alpha: 0,
	})



}