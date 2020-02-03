/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */
export declare type CapturedError = {
    readonly componentName: string | undefined | null;
    readonly componentStack: string;
    readonly error: unknown;
    readonly errorBoundary: {} | undefined | null;
    readonly errorBoundaryFound: boolean;
    readonly errorBoundaryName: string | null;
    readonly willRetry: boolean;
};
