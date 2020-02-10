'use strict';












/**
 * Defines a lazily evaluated property on the supplied `object`.
 */
function defineLazyObjectProperty<T>(object: any, name: string, descriptor: {
  get: (() => T);
  enumerable?: boolean;
  writable?: boolean;

}): void {}

export default defineLazyObjectProperty;;
