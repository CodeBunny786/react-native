'use strict';












const {
  polyfillObjectProperty
} = require('../Utilities/PolyfillFunctions');

let navigator = global.navigator;
if (navigator === undefined) {
  global.navigator = navigator = {};
}

// see https://github.com/facebook/react-native/issues/10881
polyfillObjectProperty(navigator, 'product', () => 'ReactNative');
