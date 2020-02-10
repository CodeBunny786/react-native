'use strict';;
import AnimatedNode from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';
import NativeAnimatedHelper from '../NativeAnimatedHelper';
import invariant from 'invariant';
import normalizeColor from '../../../StyleSheet/normalizeColor';

type ExtrapolateType = "extend" | "identity" | "clamp";

export type InterpolationConfigType = {
  inputRange: Array<number>;

  /* $FlowFixMe(>=0.38.0 site=react_native_fb,react_native_oss) - Flow error
   * detected during the deployment of v0.38.0. To see the error, remove this
   * comment and run flow
   */
  outputRange: Array<number> | Array<string>;
  easing?: ((input: number) => number);
  extrapolate?: ExtrapolateType;
  extrapolateLeft?: ExtrapolateType;
  extrapolateRight?: ExtrapolateType;

};

const linear = t => t;

/**
 * Very handy helper to map input ranges to output ranges with an easing
 * function and custom behavior outside of the ranges.
 */
function createInterpolation(config: InterpolationConfigType): ((input: number) => number | string) {
  return null as any;
}

function interpolate(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number, easing: ((input: number) => number), extrapolateLeft: ExtrapolateType, extrapolateRight: ExtrapolateType) {
  let result = input;

  // Extrapolate
  if (result < inputMin) {
    if (extrapolateLeft === 'identity') {
      return result;
    } else if (extrapolateLeft === 'clamp') {
      result = inputMin;
    } else if (extrapolateLeft === 'extend') {// noop
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') {
      return result;
    } else if (extrapolateRight === 'clamp') {
      result = inputMax;
    } else if (extrapolateRight === 'extend') {// noop
    }
  }

  if (outputMin === outputMax) {
    return outputMin;
  }

  if (inputMin === inputMax) {
    if (input <= inputMin) {
      return outputMin;
    }
    return outputMax;
  }

  // Input Range
  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  }

  // Easing
  result = easing(result);

  // Output Range
  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result = result + outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
}

function colorToRgba(input: string): string {
  return null as any;
}

const stringShapeRegex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;

/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36) // colors
 *   -45deg                  // values with units
 */
function createInterpolationFromStringOutputRange(config: InterpolationConfigType): ((input: number) => string) {
  return null as any;
}

function isRgbOrRgba(range) {
  return typeof range === 'string' && range.startsWith('rgb');
}

function checkPattern(arr: Array<string>) {
  const pattern = arr[0].replace(stringShapeRegex, '');
  for (let i = 1; i < arr.length; ++i) {
    invariant(pattern === arr[i].replace(stringShapeRegex, ''), 'invalid pattern ' + arr[0] + ' and ' + arr[i]);
  }
}

function findRange(input: number, inputRange: Array<number>) {
  let i;
  for (i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}

function checkValidInputRange(arr: Array<number>) {
  invariant(arr.length >= 2, 'inputRange must have at least 2 elements');
  for (let i = 1; i < arr.length; ++i) {
    invariant(arr[i] >= arr[i - 1],
    /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
     * one or both of the operands may be something that doesn't cleanly
     * convert to a string, like undefined, null, and object, etc. If you really
     * mean this implicit string conversion, you can do something like
     * String(myThing)
     */
    'inputRange must be monotonically non-decreasing ' + arr);
  }
}

function checkInfiniteRange(name: string, arr: Array<number>) {
  invariant(arr.length >= 2, name + ' must have at least 2 elements');
  invariant(arr.length !== 2 || arr[0] !== -Infinity || arr[1] !== Infinity,
  /* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
   * one or both of the operands may be something that doesn't cleanly convert
   * to a string, like undefined, null, and object, etc. If you really mean
   * this implicit string conversion, you can do something like
   * String(myThing)
   */
  name + 'cannot be ]-infinity;+infinity[ ' + arr);
}

class AnimatedInterpolation extends AnimatedWithChildren {
  // Export for testing.
  static __createInterpolation: ((config: InterpolationConfigType) => ((input: number) => number | string)) = createInterpolation;

  _parent: AnimatedNode;
  _config: InterpolationConfigType;
  _interpolation: ((input: number) => number | string);

  constructor(parent: AnimatedNode, config: InterpolationConfigType) {
    super();
    this._parent = parent;
    this._config = config;
    this._interpolation = createInterpolation(config);
  }

  __makeNative() {
    this._parent.__makeNative();
    super.__makeNative();
  }

  __getValue(): number | string {
    const parentValue: number = this._parent.__getValue();
    invariant(typeof parentValue === 'number', 'Cannot interpolate an input which is not a number.');
    return this._interpolation(parentValue);
  }

  interpolate(config: InterpolationConfigType): AnimatedInterpolation {
    return new AnimatedInterpolation(this, config);
  }

  __attach(): void {
    this._parent.__addChild(this);
  }

  __detach(): void {
    this._parent.__removeChild(this);
    super.__detach();
  }

  __transformDataType(range: Array<any>): Array<any> {
    return range.map(NativeAnimatedHelper.transformDataType);
  }

  __getNativeConfig(): any {
    if (__DEV__) {
      NativeAnimatedHelper.validateInterpolation(this._config);
    }

    return {
      inputRange: this._config.inputRange,
      // Only the `outputRange` can contain strings so we don't need to transform `inputRange` here
      outputRange: this.__transformDataType(this._config.outputRange),
      extrapolateLeft: this._config.extrapolateLeft || this._config.extrapolate || 'extend',
      extrapolateRight: this._config.extrapolateRight || this._config.extrapolate || 'extend',
      type: 'interpolation'
    };
  }
}

export default AnimatedInterpolation;;
