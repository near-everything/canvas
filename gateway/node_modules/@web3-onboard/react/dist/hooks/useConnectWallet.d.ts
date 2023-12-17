import type { ConnectOptions, DisconnectOptions, WalletState } from '@web3-onboard/core';
import type { WalletInit } from '@web3-onboard/common';
export declare const useConnectWallet: () => [{
    wallet: WalletState | null;
    connecting: boolean;
}, (options?: ConnectOptions) => Promise<WalletState[]>, (wallet: DisconnectOptions) => Promise<WalletState[]>, (addresses?: string[]) => Promise<void>, (wallets: WalletInit[]) => void, (wallet: WalletState, address?: string) => void];
