'use strict';












/**
 * The list of non-ViewManager related UIManager properties.
 *
 * In an effort to improve startup performance by lazily loading view managers,
 * the interface to access view managers will change from
 * UIManager['viewManagerName'] to UIManager.getViewManagerConfig('viewManagerName').
 * By using a function call instead of a property access, the UIManager will
 * be able to initialize and load the required view manager from native
 * synchronously. All of React Native's core components have been updated to
 * use getViewManagerConfig(). For the next few releases, any usage of
 * UIManager['viewManagerName'] will result in a warning. Because React Native
 * does not support Proxy objects, a view manager access is implied if any of
 * UIManager's properties that are not one of the properties below is being
 * accessed. Once UIManager property accesses for view managers has been fully
 * deprecated, this file will also be removed.
 */
export default ['clearJSResponder', 'configureNextLayoutAnimation', 'createView', 'dismissPopupMenu', 'dispatchViewManagerCommand', 'findSubviewIn', 'getConstantsForViewManager', 'getDefaultEventTypes', 'manageChildren', 'measure', 'measureInWindow', 'measureLayout', 'measureLayoutRelativeToParent', 'playTouchSound', 'removeRootView', 'removeSubviewsFromContainerWithID', 'replaceExistingNonRootView', 'sendAccessibilityEvent', 'setChildren', 'setJSResponder', 'setLayoutAnimationEnabledExperimental', 'showPopupMenu', 'updateView', 'viewIsDescendantOf', 'PopupMenu', 'LazyViewManagersEnabled', 'ViewManagerNames', 'StyleConstants', 'AccessibilityEventTypes', 'UIView', 'getViewManagerConfig', 'blur', 'focus', 'genericBubblingEventTypes', 'genericDirectEventTypes', 'lazilyLoadView'];;
