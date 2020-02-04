'use strict';












const AnimatedInterpolation = require('./AnimatedInterpolation');
const AnimatedNode = require('./AnimatedNode');
const AnimatedValue = require('./AnimatedValue');
const AnimatedWithChildren = require('./AnimatedWithChildren');

import { InterpolationConfigType } from "./AnimatedInterpolation";

class AnimatedAddition extends AnimatedWithChildren {

  _a: AnimatedNode;
  _b: AnimatedNode;

  constructor(a: AnimatedNode | number, b: AnimatedNode | number) {
    super();
    this._a = typeof a === 'number' ? new AnimatedValue(a) : a;
    this._b = typeof b === 'number' ? new AnimatedValue(b) : b;
  }

  __makeNative() {
    this._a.__makeNative();
    this._b.__makeNative();
    super.__makeNative();
  }

  __getValue(): number {
    return this._a.__getValue() + this._b.__getValue();
  }

  interpolate(config: InterpolationConfigType): AnimatedInterpolation {
    return new AnimatedInterpolation(this, config);
  }

  __attach(): void {
    this._a.__addChild(this);
    this._b.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): any {
    return {
      type: 'addition',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  }
}

module.exports = AnimatedAddition;
