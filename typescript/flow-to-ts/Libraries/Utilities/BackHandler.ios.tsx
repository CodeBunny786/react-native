'use strict';;
import Platform from './Platform';
import TVEventHandler from '../Components/AppleTV/TVEventHandler';

type BackPressEventName = "backPress" | "hardwareBackPress";

function emptyFunction(): void {}

/**
 * Detect hardware button presses for back navigation.
 *
 * Android: Detect hardware back button presses, and programmatically invoke the default back button
 * functionality to exit the app if there are no listeners or if none of the listeners return true.
 *
 * tvOS: Detect presses of the menu button on the TV remote.  (Still to be implemented:
 * programmatically disable menu button handling
 * functionality to exit the app if there are no listeners or if none of the listeners return true.)
 *
 * iOS: Not applicable.
 *
 * The event subscriptions are called in reverse order (i.e. last registered subscription first),
 * and if one subscription returns true then subscriptions registered earlier will not be called.
 *
 * Example:
 *
 * ```javascript
 * BackHandler.addEventListener('hardwareBackPress', function() {
 *  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
 *  // Typically you would use the navigator here to go to the last state.
 *
 *  if (!this.onMainScreen()) {
 *    this.goBack();
 *    return true;
 *  }
 *  return false;
 * });
 * ```
 */
type TBackHandler = {
  readonly exitApp: (() => void);
  readonly addEventListener: ((eventName: BackPressEventName, handler: ((...args: any) => any)) => {remove: (() => void);});
  readonly removeEventListener: ((eventName: BackPressEventName, handler: ((...args: any) => any)) => void);
};

let BackHandler: TBackHandler;

if (Platform.isTV) {
  const _tvEventHandler = new TVEventHandler();
  const _backPressSubscriptions = new Set();

  _tvEventHandler.enable(this, function (cmp, evt) {
    if (evt && evt.eventType === 'menu') {
      let invokeDefault = true;
      const subscriptions = Array.from(_backPressSubscriptions.values()).reverse();

      for (let i = 0; i < subscriptions.length; ++i) {
        if (subscriptions[i]()) {
          invokeDefault = false;
          break;
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp();
      }
    }
  });

  BackHandler = {
    exitApp: emptyFunction,

    addEventListener: function (eventName: BackPressEventName, handler: ((...args: any) => any)): {remove: (() => void);} {
      _backPressSubscriptions.add(handler);
      return {
        remove: () => BackHandler.removeEventListener(eventName, handler)
      };
    },

    removeEventListener: function (eventName: BackPressEventName, handler: ((...args: any) => any)): void {
      _backPressSubscriptions.delete(handler);
    }
  };
} else {
  BackHandler = {
    exitApp: emptyFunction,
    addEventListener(_eventName: BackPressEventName, _handler: ((...args: any) => any)) {
      return {
        remove: emptyFunction
      };
    },
    removeEventListener(_eventName: BackPressEventName, _handler: ((...args: any) => any)) {}
  };
}

export default BackHandler;;
