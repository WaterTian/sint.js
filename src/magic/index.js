import { TwistFilter, RadialBlurFilter } from 'pixi-filters';
import TweenMax from "gsap";
import Dye from './dye/dye';
import Glitch from './glitch/glitch';



export { BulgePinchFilter } from 'pixi-filters';




/**
 * @param {PIXI.Container} container
 */
export function doGlitch(container) {
    let filter = new Glitch();
    container.filters = [filter];
    TweenMax.to(filter, 10, {
    	onUpdate:function(){
    		filter.render(.1);
    	}
    })
}



/**
 * @param {PIXI.Container} container
 * @param {number} color
 */
export function doDye(container, color) {
    let filter = new Dye(color);

    let colorMatrix = new SINT.filters.ColorMatrixFilter()
    colorMatrix.blackAndWhite()
    container.filters = [colorMatrix, filter];
}


/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 * @param {boolean} clear 
 */
export function doTwistFilter(container, offset, radius, time, clear = false) {
    let filter = new TwistFilter(radius, 0);
    filter.offset.set(offset);
    let filter2 = new PIXI.filters.AlphaFilter();
    container.filters = [filter, filter2];
    TweenMax.to(filter, time, {
        angle: 10,
        ease: Strong.easeInOut,
    })
    if (!clear) return;
    TweenMax.to(filter2, time * 0.7, {
        ease: Strong.easeInOut,
        alpha: 0,
        delay: time * 0.3,
        onComplete: () => {
            container.filters = [filter2];
            TweenMax.to(filter2, 1, {
                alpha: 1,
                onComplete: () => {
                    container.filters = [];
                }
            })
        }
    })
}

/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 * @param {boolean} clear 
 */
export function doRadialBlurFilter(container, offset, radius, time, clear = false) {
    let filter = new RadialBlurFilter(0, offset, 9, radius);
    let filter2 = new PIXI.filters.AlphaFilter();
    container.filters = [filter, filter2];
    TweenMax.to(filter, time, {
        angle: 180,
        ease: Strong.easeInOut,
    })
    if (!clear) return;
    TweenMax.to(filter2, time * 0.7, {
        ease: Strong.easeInOut,
        alpha: 0,
        delay: time * 0.3,
        onComplete: () => {
            container.filters = [filter2];
            TweenMax.to(filter2, 1, {
                alpha: 1,
                onComplete: () => {
                    container.filters = [];
                }
            })
        }
    })



}