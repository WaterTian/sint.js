import * as filters from 'pixi-filters';
import TweenMax from "gsap";



/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point} offset
 * @param {number} radius
 * @param {number} time
 */
export function doTwistFilter(container, offset, radius, time) {
	let filter = new filters.TwistFilter(radius, 0);
	filter.offset.set(offset);
	container.filters = [filter];

	TweenMax.to(filter, time, {
		angle: 10,
		// onComplete: () => {
		// 	container.filters = [];
		// 	filter = null;
		// }
	})


}