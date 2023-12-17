import type { Theme, ThemingMap } from './types';
export declare const themes: {
    default: {
        '--w3o-background-color': string;
        '--w3o-foreground-color': string;
        '--w3o-text-color': string;
        '--w3o-border-color': string;
        '--w3o-action-color': string;
        '--w3o-border-radius': string;
        '--w3o-font-family': string;
    };
    light: {
        '--w3o-background-color': string;
        '--w3o-foreground-color': string;
        '--w3o-text-color': string;
        '--w3o-border-color': string;
        '--w3o-action-color': string;
        '--w3o-border-radius': string;
        '--w3o-font-family': string;
    };
    dark: {
        '--w3o-background-color': string;
        '--w3o-foreground-color': string;
        '--w3o-text-color': string;
        '--w3o-border-color': string;
        '--w3o-action-color': string;
        '--w3o-border-radius': string;
        '--w3o-font-family': string;
    };
};
export declare const returnTheme: (theme: Theme) => void | ThemingMap;
export declare const returnThemeMap: (theme: Theme) => void | ThemingMap;
export declare const handleThemeChange: (update: ThemingMap) => void;
export declare const watchForSystemThemeChange: () => void;
