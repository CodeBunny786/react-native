'use strict';;
import invariant from 'invariant';
import { Class } from "utility-types";












/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
const oneArgumentPooler = function (copyFieldsFrom) {
  const Klass = this;
  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

const twoArgumentPooler = function (a1, a2) {
  const Klass = this;
  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

const threeArgumentPooler = function (a1, a2, a3) {
  const Klass = this;
  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

const fourArgumentPooler = function (a1, a2, a3, a4) {
  const Klass = this;
  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

const standardReleaser = function (instance) {
  const Klass = this;
  invariant(instance instanceof Klass, 'Trying to release an instance into a pool of a different type.');
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

const DEFAULT_POOL_SIZE = 10;
const DEFAULT_POOLER = oneArgumentPooler;

type Pooler = any;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
const addPoolingTo = function <T>(CopyConstructor: Class<T>, pooler: Pooler): Class<T> & {
  getPooled(...args: ReadonlyArray<unknown>):
  /* arguments of the constructor */
  T;
  release(instance: unknown): void;

} {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  const NewKlass = (CopyConstructor as any);
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

const PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: (oneArgumentPooler as Pooler),
  twoArgumentPooler: (twoArgumentPooler as Pooler),
  threeArgumentPooler: (threeArgumentPooler as Pooler),
  fourArgumentPooler: (fourArgumentPooler as Pooler)
};

export default PooledClass;;
