import { Rectangle } from '../math';

/**
 *
 * 检测一个显示对象是否在另一个矩形内部
 *
 * 注意：边缘重叠始终返回fasle
 *
 * @example
 * var rect1 = new SINT.Rectangle(10, 10, 100, 100);
 * var rect2 = new SINT.Rectangle(30, 30, 50, 50);
 * SINT.isContainsRect(rect1, rect2);
 * //=> true
 *
 * @static
 * @memberof SINT
 * @function rectContainsRect
 * @param {SINT.Rectangle} rect
 * @param {SINT.Rectangle | SINT.Point } obj
 * @return {boolean}
 */
export function isContainsRect(rect, obj) {
    if (!rect || !obj) {
        return false;
    }
    // if(typeof obj === )
    if (obj instanceof SINT.Rectangle) {
        return !((rect.x >= obj.x) || (rect.y >= obj.y) ||
            (rect.x + rect.width <= obj.x + obj.width) ||
            (rect.y + rect.height <= obj.y + obj.height));
    }
    if (obj instanceof SINT.Point) {
        return (obj.x >= rectGetMinX(rect) && obj.x <= rectGetMaxX(rect) &&
            obj.y >= rectGetMinY(rect) && obj.y <= rectGetMaxY(rect));
    }
}


/**
 * 检测两个显示对象是否相交，一般用于检测碰撞
 * 
 * 注意：边缘重叠始终返回true
 *
 * @example
 * var rect1 = new SINT.Rectangle(10, 10, 50, 50);
 * var rect2 = new SINT.Rectangle(50, 30, 50, 50);
 * SINT.isIntersectsRect(rect1, rect2);
 * //=> true
 *
 * @static
 * @memberof SINT
 * @function isIntersectsRect
 * @param {SINT.Rectangle} rectA
 * @param {SINT.Rectangle} rectB
 * @return {boolean}
 */
export function isIntersectsRect(rectA, rectB) {
    return !(rectGetMaxX(rectA) < rectGetMinX(rectB) ||
        rectGetMaxX(rectB) < rectGetMinX(rectA) ||
        rectGetMaxY(rectA) < rectGetMinY(rectB) ||
        rectGetMaxY(rectB) < rectGetMinY(rectA));
}


function rectGetMinX(rect) {
  return rect.x;
}
function rectGetMinY(rect) {
  return rect.y;
}
function rectGetMaxX(rect) {
  return (rect.x + rect.width);
}
function rectGetMaxY(rect) {
  return (rect.y + rect.height);
}

function rectGetMidX(rect) {
  return (rect.x + rect.width / 2.0);
}
function rectGetMidY(rect) {
  return rect.y + rect.height / 2.0;
}
