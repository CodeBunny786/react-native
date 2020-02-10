'use strict';;
import infoLog from '../Utilities/infoLog';
import performanceNow from 'fbjs/lib/performanceNow';

type Handler = {
  onIterate?: (() => void);
  onStall: ((params: {
    lastInterval: number;
    busyTime: number;

  }) => string | null | undefined);

};

/**
 * A utility for tracking stalls in the JS event loop that prevent timers and
 * other events from being processed in a timely manner.
 *
 * The "stall" time is defined as the amount of time in access of the acceptable
 * threshold, which is typically around 100-200ms. So if the treshold is set to
 * 100 and a timer fires 150 ms later than it was scheduled because the event
 * loop was tied up, that would be considered a 50ms stall.
 *
 * By default, logs stall events to the console when installed. Can also be
 * queried with `getStats`.
 */
const JSEventLoopWatchdog = {
  getStats: function (): any {
    return { stallCount, totalStallTime, longestStall, acceptableBusyTime };
  },
  reset: function () {
    infoLog('JSEventLoopWatchdog: reset');
    totalStallTime = 0;
    stallCount = 0;
    longestStall = 0;
    lastInterval = performanceNow();
  },
  addHandler: function (handler: Handler) {
    handlers.push(handler);
  },
  install: function ({
    thresholdMS
  }: {thresholdMS: number;}) {
    acceptableBusyTime = thresholdMS;
    if (installed) {
      return;
    }
    installed = true;
    lastInterval = performanceNow();
    function iteration() {
      const now = performanceNow();
      const busyTime = now - lastInterval;
      if (busyTime >= thresholdMS) {
        const stallTime = busyTime - thresholdMS;
        stallCount++;
        totalStallTime += stallTime;
        longestStall = Math.max(longestStall, stallTime);
        let msg = `JSEventLoopWatchdog: JS thread busy for ${busyTime}ms. ` + `${totalStallTime}ms in ${stallCount} stalls so far. `;
        handlers.forEach(handler => {
          msg += handler.onStall({ lastInterval, busyTime }) || '';
        });
        infoLog(msg);
      }
      handlers.forEach(handler => {
        handler.onIterate && handler.onIterate();
      });
      lastInterval = now;
      setTimeout(iteration, thresholdMS / 5);
    }
    iteration();
  }
};

let acceptableBusyTime = 0;
let installed = false;
let totalStallTime = 0;
let stallCount = 0;
let longestStall = 0;
let lastInterval = 0;
const handlers: Array<Handler> = [];

export default JSEventLoopWatchdog;;
