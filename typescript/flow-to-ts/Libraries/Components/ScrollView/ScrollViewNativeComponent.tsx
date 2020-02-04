'use strict';












const registerGeneratedViewConfig = require('../../Utilities/registerGeneratedViewConfig');
const requireNativeComponent = require('../../ReactNative/requireNativeComponent');
import ScrollViewViewConfig from "./ScrollViewViewConfig";

import { ScrollViewNativeProps, ScrollViewNativeComponentType } from "./ScrollViewNativeComponentType";

let ScrollViewNativeComponent;
if (global.RN$Bridgeless) {
  registerGeneratedViewConfig('RCTScrollView', ScrollViewViewConfig);
  ScrollViewNativeComponent = 'RCTScrollView';
} else {
  ScrollViewNativeComponent = requireNativeComponent<ScrollViewNativeProps>('RCTScrollView');
}

export default ((ScrollViewNativeComponent as any) as ScrollViewNativeComponentType);
