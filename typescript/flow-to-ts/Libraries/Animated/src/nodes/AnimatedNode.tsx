'use strict';












const NativeAnimatedHelper = require('../NativeAnimatedHelper');

const NativeAnimatedAPI = NativeAnimatedHelper.API;
const invariant = require('invariant');

type ValueListenerCallback = (state: {value: number;}) => unknown;

let _uniqueId = 1;

// Note(vjeux): this would be better as an interface but flow doesn't
// support them yet
class AnimatedNode {

  _listeners: {
    [key: string]: ValueListenerCallback;
  };
  __nativeAnimatedValueListener: any | null | undefined;
  __attach(): void {}
  __detach(): void {
    if (this.__isNative && this.__nativeTag != null) {
      NativeAnimatedHelper.API.dropAnimatedNode(this.__nativeTag);
      this.__nativeTag = undefined;
    }
  }
  __getValue(): any {}
  __getAnimatedValue(): any {
    return this.__getValue();
  }
  __addChild(child: AnimatedNode) {}
  __removeChild(child: AnimatedNode) {}
  __getChildren(): Array<AnimatedNode> {
    return [];
  }

  /* Methods and props used by native Animated impl */
  __isNative: boolean;
  __nativeTag: number | null | undefined;
  __shouldUpdateListenersForNewNativeTag: boolean;

  constructor() {
    this._listeners = {};
  }

  __makeNative() {
    if (!this.__isNative) {
      throw new Error('This node cannot be made a "native" animated node');
    }

    if (this.hasListeners()) {
      this._startListeningToNativeValueUpdates();
    }
  }

  /**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   *
   * See http://facebook.github.io/react-native/docs/animatedvalue.html#addlistener
   */
  addListener(callback: (value: any) => unknown): string {
    const id = String(_uniqueId++);
    this._listeners[id] = callback;
    if (this.__isNative) {
      this._startListeningToNativeValueUpdates();
    }
    return id;
  }

  /**
   * Unregister a listener. The `id` param shall match the identifier
   * previously returned by `addListener()`.
   *
   * See http://facebook.github.io/react-native/docs/animatedvalue.html#removelistener
   */
  removeListener(id: string): void {
    delete this._listeners[id];
    if (this.__isNative && !this.hasListeners()) {
      this._stopListeningForNativeValueUpdates();
    }
  }

  /**
   * Remove all registered listeners.
   *
   * See http://facebook.github.io/react-native/docs/animatedvalue.html#removealllisteners
   */
  removeAllListeners(): void {
    this._listeners = {};
    if (this.__isNative) {
      this._stopListeningForNativeValueUpdates();
    }
  }

  hasListeners(): boolean {
    return !!Object.keys(this._listeners).length;
  }

  _startListeningToNativeValueUpdates() {
    if (this.__nativeAnimatedValueListener && !this.__shouldUpdateListenersForNewNativeTag) {
      return;
    }

    if (this.__shouldUpdateListenersForNewNativeTag) {
      this.__shouldUpdateListenersForNewNativeTag = false;
      this._stopListeningForNativeValueUpdates();
    }

    NativeAnimatedAPI.startListeningToAnimatedNodeValue(this.__getNativeTag());
    this.__nativeAnimatedValueListener = NativeAnimatedHelper.nativeEventEmitter.addListener('onAnimatedValueUpdate', data => {
      if (data.tag !== this.__getNativeTag()) {
        return;
      }
      this._onAnimatedValueUpdateReceived(data.value);
    });
  }

  _onAnimatedValueUpdateReceived(value: number) {
    this.__callListeners(value);
  }

  __callListeners(value: number): void {
    for (const key in this._listeners) {
      this._listeners[key]({ value });
    }
  }

  _stopListeningForNativeValueUpdates() {
    if (!this.__nativeAnimatedValueListener) {
      return;
    }

    this.__nativeAnimatedValueListener.remove();
    this.__nativeAnimatedValueListener = null;
    NativeAnimatedAPI.stopListeningToAnimatedNodeValue(this.__getNativeTag());
  }

  __getNativeTag(): number {
    NativeAnimatedHelper.assertNativeAnimatedModule();
    invariant(this.__isNative, 'Attempt to get native tag from node not marked as "native"');

    const nativeTag = this.__nativeTag ?? NativeAnimatedHelper.generateNewNodeTag();

    if (this.__nativeTag == null) {
      this.__nativeTag = nativeTag;
      NativeAnimatedHelper.API.createAnimatedNode(nativeTag, this.__getNativeConfig());
      this.__shouldUpdateListenersForNewNativeTag = true;
    }

    return nativeTag;
  }
  __getNativeConfig(): Object {
    throw new Error('This JS animated node type cannot be used as native animated node');
  }
  toJSON(): any {
    return this.__getValue();
  }
}

module.exports = AnimatedNode;
