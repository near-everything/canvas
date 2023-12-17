import * as React from 'react';
import type { InitOptions, OnboardAPI } from '@web3-onboard/core';
export declare let web3OnboardGlobal: OnboardAPI | undefined;
export declare const init: (options: InitOptions) => OnboardAPI;
export declare const Context: React.Context<OnboardAPI | undefined>;
export type Web3OnboardProviderProps = {
    web3Onboard: OnboardAPI;
};
export declare function Web3OnboardProvider({ children, web3Onboard }: React.PropsWithChildren<Web3OnboardProviderProps>): JSX.Element;
export declare function useWeb3Onboard(): OnboardAPI;
