import Tween from '../Tween';
import Dye from './dye/dye';


import {
    default as ColorMatrixFilter
} from './colormatrix/ColorMatrixFilter';
import {
    default as AlphaFilter
} from './alpha/AlphaFilter';
import {
    default as BlurFilter
} from './blur/BlurFilter';

import {
    BulgePinchFilter
} from './bulge-pinch';
import {
    TwistFilter
} from './twist';

import {
    GlitchFilter
} from './glitch';
import {
    HolesFilter
} from './holes';
import {
    DisplacementFilter
} from './displacement';



/**
 * @example
 * 
 * SINT.magic.doTwist(Container, [500, 500], 400, 2, false);
 * 
 * SINT.magic.doGlitch(game.stage);
 *
 * var filter = new SINT.magic.BulgePinchFilter([0.5, 0.5], 200, 1.2);
 * Container.filters = [filter];
 * 
 * var bg_filter = new SINT.magic.HolesFilter(0x4a778a, 0xf3f9f1, 0.5, 1);
 * bgContainer.filters = [bg_filter];
 * 
 * @namespace SINT.magic
 */




// export { default as FXAAFilter } from './fxaa/FXAAFilter';
// export { default as NoiseFilter } from './noise/NoiseFilter';
// export { default as DisplacementFilter } from './displacement/DisplacementFilter';
// export { default as BlurFilter } from './blur/BlurFilter';
// export { default as BlurXFilter } from './blur/BlurXFilter';
// export { default as BlurYFilter } from './blur/BlurYFilter';
// export { default as ColorMatrixFilter } from './colormatrix/ColorMatrixFilter';
// export { default as AlphaFilter } from './alpha/AlphaFilter';



export {
    AlphaFilter,
    ColorMatrixFilter,
    BlurFilter,
    BulgePinchFilter,
    GlitchFilter,
    HolesFilter,
    DisplacementFilter,
}



/**
 * @memberof SINT.magic
 * @function doGlitch
 * @param {SINT.Container} [container] 
 * @param {number} [time]
 * @param {boolean} [clear=false] 
 */

export function doGlitch(container, time, clear = false) {
    let filter = new GlitchFilter();
    container.filters = [filter];
    Tween.to(filter, time, {
        time: 1,
        ease: Linear.easeNone,
        onComplete: function () {
            if (!clear) return;
            container.filters = [];
        }
    })
}



/**
 * @memberof SINT.magic
 * @function doDye
 * @param {SINT.Container}  [container] 
 */
export function doDye(container, color) {
    let filter = new Dye(color);

    let colorMatrix = new ColorMatrixFilter()
    colorMatrix.blackAndWhite()
    container.filters = [colorMatrix, filter];
}



/**
 * @memberof SINT.magic
 * @function doTwist
 * @param {SINT.Container} [container] 
 * @param {SINT.Point | Array.<number>} [offset]
 * @param {number} [radius]
 * @param {number} [time]
 * @param {boolean} [clear=false] 
 */
export function doTwist(container, offset, radius, time, clear = false) {
    let filter = new TwistFilter(radius, 0);
    filter.offset.set(offset);
    let filter2 = new AlphaFilter();
    container.filters = [filter, filter2];
    Tween.to(filter, time, {
        angle: 10,
        ease: Strong.easeInOut,
    })
    if (!clear) return;
    Tween.to(filter2, time * 0.7, {
        ease: Strong.easeInOut,
        alpha: 0,
        delay: time * 0.3,
        onComplete: () => {
            container.filters = [filter2];
            Tween.to(filter2, 1, {
                alpha: 1,
                onComplete: () => {
                    container.filters = [];
                }
            })
        }
    })
}



/**
 * @memberof SINT.magic
 * @function doDisplacement
 * @param {SINT.Container} [container] 
 * @param {number} [density]
 * @param {number} [speed]
 * @param {number} [zoom]
 * @param {number} [time]
 * @param {boolean} [clear=false] 
 */

export function doDisplacement(container, density, speed, zoom, time, clear = false) {
    let filter = new DisplacementFilter();
    container.filters = [filter];

    Tween.to(filter, time, {
        density: density,
        speed: speed,
        zoom: zoom,
        ease: Linear.easeNone,
        onComplete: function () {
            if (!clear) return;
            container.filters = [];
        }
    })

}



// /**
//  * @memberof SINT.magic
//  * @function doRadialBlurFilter
//  * @param {SINT.Container} container
//  * @param {SINT.Point | Array.<number>} offset
//  * @param {number} radius
//  * @param {number} time
//  * @param {boolean} clear 
//  */
// export function doRadialBlurFilter(container, offset, radius, time, clear = false) {
//     let filter = new RadialBlurFilter(0, offset, 9, radius);
//     let filter2 = new AlphaFilter();
//     container.filters = [filter, filter2];
//     Tween.to(filter, time, {
//         angle: 180,
//         ease: Strong.easeInOut,
//     })
//     if (!clear) return;
//     Tween.to(filter2, time * 0.7, {
//         ease: Strong.easeInOut,
//         alpha: 0,
//         delay: time * 0.3,
//         onComplete: () => {
//             container.filters = [filter2];
//             Tween.to(filter2, 1, {
//                 alpha: 1,
//                 onComplete: () => {
//                     container.filters = [];
//                 }
//             })
//         }
//     })
// }