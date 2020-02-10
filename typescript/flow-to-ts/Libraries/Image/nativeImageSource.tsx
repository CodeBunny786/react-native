'use strict';
import { $ReadOnly } from "utility-types";












import Platform from "../Utilities/Platform";

import { ImageURISource } from "./ImageSource";

type NativeImageSourceSpec = $ReadOnly<{
  android?: string;
  ios?: string;
  default?: string;

  // For more details on width and height, see
  // http://facebook.github.io/react-native/docs/images.html#why-not-automatically-size-everything
  height: number;
  width: number;
}>;

/**
 * In hybrid apps, use `nativeImageSource` to access images that are already
 * available on the native side, for example in Xcode Asset Catalogs or
 * Android's drawable folder.
 *
 * However, keep in mind that React Native Packager does not guarantee that the
 * image exists. If the image is missing you'll get an empty box. When adding
 * new images your app needs to be recompiled.
 *
 * Prefer Static Image Resources system which provides more guarantees,
 * automates measurements and allows adding new images without rebuilding the
 * native app. For more details visit:
 *
 *   http://facebook.github.io/react-native/docs/images.html
 *
 */
function nativeImageSource(spec: NativeImageSourceSpec): ImageURISource {
  return null as any;
}

export default nativeImageSource;;
