import type { ConnectedChain } from '@web3-onboard/core';
import type { Chain } from '@web3-onboard/common';
type SetChainOptions = {
    chainId: string;
    chainNamespace?: string;
};
export declare const useSetChain: (walletLabel?: string) => [{
    chains: Chain[];
    connectedChain: ConnectedChain | null;
    settingChain: boolean;
}, (options: SetChainOptions) => Promise<boolean>];
export {};
