import type { EthereumTransactionData, Network } from 'bnc-sdk';
import type { WalletState } from './types.js';
export declare const actionableEventCode: (eventCode: string) => boolean;
export declare const validGasNetwork: (network: Network) => boolean;
export declare const walletSupportsReplacement: (wallet: WalletState) => boolean;
export declare function replaceTransaction({ type, wallet, transaction }: {
    type: 'speedup' | 'cancel';
    wallet: WalletState;
    transaction: EthereumTransactionData;
}): Promise<unknown>;
