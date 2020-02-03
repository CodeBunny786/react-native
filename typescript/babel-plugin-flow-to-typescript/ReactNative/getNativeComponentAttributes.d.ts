declare const ReactNativeStyleAttributes: any;
declare const UIManager: any;
declare const insetsDiffer: any;
declare const invariant: any;
declare const matricesDiffer: any;
declare const pointsDiffer: any;
declare const processColor: any;
declare const processColorArray: any;
declare const resolveAssetSource: any;
declare const sizesDiffer: any;
declare const warning: any;
declare function getNativeComponentAttributes(uiViewClassName: string): any;
declare let hasAttachedDefaultEventTypes: boolean;
declare function attachDefaultEventTypes(viewConfig: any): void;
declare function merge(destination?: object | null, source?: object | null): object | undefined | null;
declare function getDifferForType(typeName: string): ((prevProp: any, nextProp: any) => boolean) | undefined | null;
declare function getProcessorForType(typeName: string): ((nextProp: any) => any) | undefined | null;
