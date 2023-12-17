import type { Chain } from '@web3-onboard/common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import type { WalletState, ConnectOptions } from './types.js';
import type { EthereumTransactionData } from 'bnc-sdk';
export declare const reset$: Subject<void>;
export declare const disconnectWallet$: Subject<string>;
export declare const connectWallet$: BehaviorSubject<{
    autoSelect?: ConnectOptions['autoSelect'];
    actionRequired?: string;
    inProgress: boolean;
}>;
export declare const switchChainModal$: BehaviorSubject<{
    chain: Chain;
}>;
export declare const wallets$: Observable<WalletState[]>;
export declare const transactions$: BehaviorSubject<EthereumTransactionData[]>;
export declare function updateTransaction(tx: EthereumTransactionData): void;
export declare function removeTransaction(hash: string): void;
export declare const onMount$: Observable<void>;
export declare const onDestroy$: Observable<void>;
export declare const afterUpdate$: Observable<void>;
export declare const beforeUpdate$: Observable<void>;
