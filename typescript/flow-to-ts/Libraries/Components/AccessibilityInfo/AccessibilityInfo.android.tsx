'use strict';;
import RCTDeviceEventEmitter from '../../EventEmitter/RCTDeviceEventEmitter';
import UIManager from '../../ReactNative/UIManager';
import { $Keys } from "utility-types";












import NativeAccessibilityInfo from "./NativeAccessibilityInfo";

const REDUCE_MOTION_EVENT = 'reduceMotionDidChange';
const TOUCH_EXPLORATION_EVENT = 'touchExplorationDidChange';

type ChangeEventName = $Keys<{
  change: string;
  reduceMotionChanged: string;
  screenReaderChanged: string;

}>;

const _subscriptions = new Map();

/**
 * Sometimes it's useful to know whether or not the device has a screen reader
 * that is currently active. The `AccessibilityInfo` API is designed for this
 * purpose. You can use it to query the current state of the screen reader as
 * well as to register to be notified when the state of the screen reader
 * changes.
 *
 * See http://facebook.github.io/react-native/docs/accessibilityinfo.html
 */
const AccessibilityInfo = {
  /**
   * iOS only
   */
  isBoldTextEnabled: function (): Promise<boolean> {
    return Promise.resolve(false);
  },

  /**
   * iOS only
   */
  isGrayscaleEnabled: function (): Promise<boolean> {
    return Promise.resolve(false);
  },

  /**
   * iOS only
   */
  isInvertColorsEnabled: function (): Promise<boolean> {
    return Promise.resolve(false);
  },

  isReduceMotionEnabled: function (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (NativeAccessibilityInfo) {
        NativeAccessibilityInfo.isReduceMotionEnabled(resolve);
      } else {
        reject(false);
      }
    });
  },

  /**
   * iOS only
   */
  isReduceTransparencyEnabled: function (): Promise<boolean> {
    return Promise.resolve(false);
  },

  isScreenReaderEnabled: function (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (NativeAccessibilityInfo) {
        NativeAccessibilityInfo.isTouchExplorationEnabled(resolve);
      } else {
        reject(false);
      }
    });
  },

  /**
   * Deprecated
   *
   * Same as `isScreenReaderEnabled`
   */
  get fetch(): (() => Promise<boolean>) {
    console.warn('AccessibilityInfo.fetch is deprecated, call Accessibility.isScreenReaderEnabled instead');
    return this.isScreenReaderEnabled;
  },

  addEventListener: function (eventName: ChangeEventName, handler: ((...args: any) => any)): void {
    let listener;

    if (eventName === 'change' || eventName === 'screenReaderChanged') {
      listener = RCTDeviceEventEmitter.addListener(TOUCH_EXPLORATION_EVENT, enabled => {
        handler(enabled);
      });
    } else if (eventName === 'reduceMotionChanged') {
      listener = RCTDeviceEventEmitter.addListener(REDUCE_MOTION_EVENT, enabled => {
        handler(enabled);
      });
    }

    _subscriptions.set(handler, listener);
  },

  removeEventListener: function (eventName: ChangeEventName, handler: ((...args: any) => any)): void {
    const listener = _subscriptions.get(handler);
    if (!listener) {
      return;
    }
    listener.remove();
    _subscriptions.delete(handler);
  },

  /**
   * Set accessibility focus to a react component.
   *
   * See http://facebook.github.io/react-native/docs/accessibilityinfo.html#setaccessibilityfocus
   */
  setAccessibilityFocus: function (reactTag: number): void {
    UIManager.sendAccessibilityEvent(reactTag, UIManager.getConstants().AccessibilityEventTypes.typeViewFocused);
  },

  /**
   * Post a string to be announced by the screen reader.
   *
   * See http://facebook.github.io/react-native/docs/accessibilityinfo.html#announceforaccessibility
   */
  announceForAccessibility: function (announcement: string): void {
    if (NativeAccessibilityInfo) {
      NativeAccessibilityInfo.announceForAccessibility(announcement);
    }
  }
};

export default AccessibilityInfo;;
