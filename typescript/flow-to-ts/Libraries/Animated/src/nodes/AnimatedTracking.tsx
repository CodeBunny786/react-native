'use strict';;
import AnimatedValue from './AnimatedValue';
import AnimatedNode from './AnimatedNode';
import _Import0 from '../NativeAnimatedHelper';
const {
  generateNewAnimationId,
  shouldUseNativeDriver
} = _Import0;

import { EndCallback } from "../animations/Animation";

class AnimatedTracking extends AnimatedNode {

  _value: AnimatedValue;
  _parent: AnimatedNode;
  _callback: EndCallback | null | undefined;
  _animationConfig: any;
  _animationClass: any;
  _useNativeDriver: boolean;

  constructor(value: AnimatedValue, parent: AnimatedNode, animationClass: any, animationConfig: any, callback?: EndCallback | null | undefined) {
    super();
    this._value = value;
    this._parent = parent;
    this._animationClass = animationClass;
    this._animationConfig = animationConfig;
    this._useNativeDriver = shouldUseNativeDriver(animationConfig);
    this._callback = callback;
    this.__attach();
  }

  __makeNative() {
    this.__isNative = true;
    this._parent.__makeNative();
    super.__makeNative();
    this._value.__makeNative();
  }

  __getValue(): any {
    return this._parent.__getValue();
  }

  __attach(): void {
    this._parent.__addChild(this);
    if (this._useNativeDriver) {
      // when the tracking starts we need to convert this node to a "native node"
      // so that the parent node will be made "native" too. This is necessary as
      // if we don't do this `update` method will get called. At that point it
      // may be too late as it would mean the JS driver has already started
      // updating node values
      this.__makeNative();
    }
  }

  __detach(): void {
    this._parent.__removeChild(this);
    super.__detach();
  }

  update(): void {
    this._value.animate(new this._animationClass({
      ...this._animationConfig,
      toValue: (this._animationConfig.toValue as any).__getValue()
    }), this._callback);
  }

  __getNativeConfig(): any {
    const animation = new this._animationClass({
      ...this._animationConfig,
      // remove toValue from the config as it's a ref to Animated.Value
      toValue: undefined
    });
    const animationConfig = animation.__getNativeAnimationConfig();
    return {
      type: 'tracking',
      animationId: generateNewAnimationId(),
      animationConfig,
      toValue: this._parent.__getNativeTag(),
      value: this._value.__getNativeTag()
    };
  }
}

export default AnimatedTracking;;
