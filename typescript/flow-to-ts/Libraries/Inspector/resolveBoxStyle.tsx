'use strict';;
import I18nManager from '../ReactNative/I18nManager';
import { $ReadOnly } from "utility-types";












/**
 * Resolve a style property into its component parts.
 *
 * For example:
 *
 *   > resolveProperties('margin', {margin: 5, marginBottom: 10})
 *   {top: 5, left: 5, right: 5, bottom: 10}
 *
 * If no parts exist, this returns null.
 */
function resolveBoxStyle(prefix: string, style: any): $ReadOnly<{
  bottom: number;
  left: number;
  right: number;
  top: number;
}> | null | undefined {
  return null as any;
}

export default resolveBoxStyle;;
