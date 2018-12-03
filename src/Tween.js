import { TweenLite } from "gsap/TweenLite";
import { EasePack } from "gsap/EasePack"; 



/**
 * SINT.Tween extends the TweenLite.
 * 
 * and import EasePack , docs: {@link https://greensock.com/docs/Easing}
 *
 * TweenLite + EasePack = 34k
 * 
 * @example
 * SINT.Tween.to(_obj, 0.6, {
 * 	alpha: 0.3,
 * 	ease: Strong.easeOut,
 * 	delay: 1.0,
 * 	onComplete: function() {
 * 		conseole.log("complete");
 * 	}
 * })
 * 
 * @class
 * @extends TweenLite
 * @see https://greensock.com/docs/TweenLite
 * @memberof SINT
 */


export default class Tween extends TweenLite
{
    constructor()
    {
        super()
    }
}