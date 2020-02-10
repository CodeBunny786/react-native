declare const _default: {
    getViewManagerConfig: (viewManagerName: string) => unknown;
    getConstants: () => {};
    getConstantsForViewManager: (viewManagerName: string) => void;
    getDefaultEventTypes: () => any[];
    playTouchSound: () => void;
    lazilyLoadView: (name: string) => void;
    createView: (reactTag: number | null | undefined, viewName: string, rootTag: number, props: any) => void;
    updateView: (reactTag: number, viewName: string, props: any) => void;
    focus: (reactTag: number | null | undefined) => void;
    blur: (reactTag: number | null | undefined) => void;
    findSubviewIn: (reactTag: number | null | undefined, point: number[], callback: (nativeViewTag: number, left: number, top: number, width: number, height: number) => void) => void;
    dispatchViewManagerCommand: (reactTag: number | null | undefined, commandID: number, commandArgs: (string | number | boolean)[] | null | undefined) => void;
    measure: (reactTag: number | null | undefined, callback: (left: number, top: number, width: number, height: number, pageX: number, pageY: number) => void) => void;
    measureInWindow: (reactTag: number | null | undefined, callback: (x: number, y: number, width: number, height: number) => void) => void;
    viewIsDescendantOf: (reactTag: number | null | undefined, ancestorReactTag: number | null | undefined, callback: (result: boolean[]) => void) => void;
    measureLayout: (reactTag: number | null | undefined, ancestorReactTag: number | null | undefined, errorCallback: (error: any) => void, callback: (left: number, top: number, width: number, height: number) => void) => void;
    measureLayoutRelativeToParent: (reactTag: number | null | undefined, errorCallback: (error: any) => void, callback: (left: number, top: number, width: number, height: number) => void) => void;
    setJSResponder: (reactTag: number | null | undefined, blockNativeResponder: boolean) => void;
    clearJSResponder: () => void;
    configureNextLayoutAnimation: (config: any, callback: () => void, errorCallback: (error: any) => void) => void;
    removeSubviewsFromContainerWithID: (containerID: number) => void;
    replaceExistingNonRootView: (reactTag: number | null | undefined, newReactTag: number | null | undefined) => void;
    setChildren: (containerTag: number | null | undefined, reactTags: number[]) => void;
    manageChildren: (containerTag: number | null | undefined, moveFromIndices: number[], moveToIndices: number[], addChildReactTags: number[], addAtIndices: number[], removeAtIndices: number[]) => void;
    setLayoutAnimationEnabledExperimental: (enabled: boolean) => void;
    sendAccessibilityEvent: (reactTag: number | null | undefined, eventType: number) => void;
    showPopupMenu: (reactTag: number | null | undefined, items: string[], error: (error: any) => void, success: (event: string, selected?: number | undefined) => void) => void;
    dismissPopupMenu: () => void;
};
export default _default;
