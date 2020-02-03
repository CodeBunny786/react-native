import { EndCallback } from './animations/Animation';
export declare type CompositeAnimation = {
    start: (callback?: EndCallback | null) => void;
    stop: () => void;
    reset: () => void;
    _startNativeLoop: (iterations?: number) => void;
    _isUsingNativeDriver: () => boolean;
};
