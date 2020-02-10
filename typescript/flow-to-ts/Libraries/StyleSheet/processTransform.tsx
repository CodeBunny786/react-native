'use strict';;
import MatrixMath from '../Utilities/MatrixMath';
import Platform from '../Utilities/Platform';
import invariant from 'invariant';
import stringifySafe from '../Utilities/stringifySafe';

/**
 * Generate a transform matrix based on the provided transforms, and use that
 * within the style object instead.
 *
 * This allows us to provide an API that is similar to CSS, where transforms may
 * be applied in an arbitrary order, and yet have a universal, singular
 * interface to native code.
 */
function processTransform(transform: Array<any>): Array<any> | Array<number> {
  return null as any;
}

/**
 * Performs a destructive operation on a transform matrix.
 */
function _multiplyTransform(result: Array<number>, matrixMathFunction: ((...args: any) => any), args: Array<number>): void {}

/**
 * Parses a string like '0.5rad' or '60deg' into radians expressed in a float.
 * Note that validation on the string is done in `_validateTransform()`.
 */
function _convertToRadians(value: string): number {
  return null as any;
}

function _validateTransforms(transform: Array<any>): void {}

function _validateTransform(key, value, transformation) {
  invariant(!value.getValue, 'You passed an Animated.Value to a normal component. ' + 'You need to wrap that component in an Animated. For example, ' + 'replace <View /> by <Animated.View />.');

  const multivalueTransforms = ['matrix', 'translate'];
  if (multivalueTransforms.indexOf(key) !== -1) {
    invariant(Array.isArray(value), 'Transform with key of %s must have an array as the value: %s', key, stringifySafe(transformation));
  }
  switch (key) {
    case 'matrix':
      invariant(value.length === 9 || value.length === 16, 'Matrix transform must have a length of 9 (2d) or 16 (3d). ' + 'Provided matrix has a length of %s: %s',
      /* $FlowFixMe(>=0.84.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.84 was deployed. To see the error, delete
       * this comment and run Flow. */
      value.length, stringifySafe(transformation));
      break;
    case 'translate':
      invariant(value.length === 2 || value.length === 3, 'Transform with key translate must be an array of length 2 or 3, found %s: %s',
      /* $FlowFixMe(>=0.84.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.84 was deployed. To see the error, delete
       * this comment and run Flow. */
      value.length, stringifySafe(transformation));
      break;
    case 'rotateX':case 'rotateY':case 'rotateZ':case 'rotate':case 'skewX':case 'skewY':
      invariant(typeof value === 'string', 'Transform with key of "%s" must be a string: %s', key, stringifySafe(transformation));
      invariant(value.indexOf('deg') > -1 || value.indexOf('rad') > -1, 'Rotate transform must be expressed in degrees (deg) or radians ' + '(rad): %s', stringifySafe(transformation));
      break;
    case 'perspective':
      invariant(typeof value === 'number', 'Transform with key of "%s" must be a number: %s', key, stringifySafe(transformation));
      invariant(value !== 0, 'Transform with key of "%s" cannot be zero: %s', key, stringifySafe(transformation));
      break;
    case 'translateX':case 'translateY':case 'scale':case 'scaleX':case 'scaleY':
      invariant(typeof value === 'number', 'Transform with key of "%s" must be a number: %s', key, stringifySafe(transformation));
      break;
    default:
      invariant(false, 'Invalid transform %s: %s', key, stringifySafe(transformation));

  }
}

export default processTransform;;
