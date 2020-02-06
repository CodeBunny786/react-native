'use strict';;
const Promise = require('promise/setimmediate/es6-extensions');

import 'promise/setimmediate/done';
import 'promise/setimmediate/finally';

if (__DEV__) {
  require('promise/setimmediate/rejection-tracking').enable({
    allRejections: true,
    onUnhandled: (id, error = {}) => {
      let message: string;
      let stack: string | null | undefined;

      const stringValue = Object.prototype.toString.call(error);
      if (stringValue === '[object Error]') {
        message = Error.prototype.toString.call(error);
        stack = error.stack;
      } else {
        try {
          message = require('pretty-format')(error);
        } catch {
          message = typeof error === 'string' ? error : JSON.stringify(error);
        }
      }

      const warning = `Possible Unhandled Promise Rejection (id: ${id}):\n` + `${message}\n` + (stack == null ? '' : stack);
      console.warn(warning);
    },
    onHandled: id => {
      const warning = `Promise Rejection Handled (id: ${id})\n` + 'This means you can ignore any previous messages of the form ' + `"Possible Unhandled Promise Rejection (id: ${id}):"`;
      console.warn(warning);
    }
  });
}

export default Promise;
