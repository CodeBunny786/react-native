/**
 * Status bar style
 */
export declare type StatusBarStyle = keyof {
    /**
     * Default status bar style (dark for iOS, light for Android)
     */
    default: string;
    /**
     * Dark background, white texts and icons
     */
    'light-content': string;
    /**
     * Light background, dark texts and icons
     */
    'dark-content': string;
};
/**
 * Status bar animation
 */
export declare type StatusBarAnimation = keyof {
    /**
     * No animation
     */
    none: string;
    /**
     * Fade animation
     */
    fade: string;
    /**
     * Slide animation
     */
    slide: string;
};
