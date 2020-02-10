'use strict';;
import ReactNativeVersion from './ReactNativeVersion';












import Platform from "../Utilities/Platform";

/**
 * Checks that the version of this React Native JS is compatible with the native
 * code, throwing an error if it isn't.
 *
 * The existence of this module is part of the public interface of React Native
 * even though it is used only internally within React Native. React Native
 * implementations for other platforms (ex: Windows) may override this module
 * and rely on its existence as a separate module.
 */
exports.checkVersions = function checkVersions(): void {
  const nativeVersion = Platform.constants.reactNativeVersion;
  if (ReactNativeVersion.version.major !== nativeVersion.major || ReactNativeVersion.version.minor !== nativeVersion.minor) {
    console.error(`React Native version mismatch.\n\nJavaScript version: ${_formatVersion(ReactNativeVersion.version)}\n` + `Native version: ${_formatVersion(nativeVersion)}\n\n` + 'Make sure that you have rebuilt the native code. If the problem ' + 'persists try clearing the Watchman and packager caches with ' + '`watchman watch-del-all && react-native start --reset-cache`.');
  }
};

function _formatVersion(version): string {
  return null as any;
}
