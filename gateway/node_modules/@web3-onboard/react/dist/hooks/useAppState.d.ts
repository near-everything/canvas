import type { AppState } from '@web3-onboard/core';
export declare const useAppState: {
    (): AppState;
    <K extends keyof AppState>(stateKey?: K): AppState[K];
};
