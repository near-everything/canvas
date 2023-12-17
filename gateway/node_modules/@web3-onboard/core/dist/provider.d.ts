import { Observable } from 'rxjs';
import { providers } from 'ethers';
import type { ChainId, EIP1193Provider, ProviderAccounts, Chain } from '@web3-onboard/common';
import type { Address, Balances, Ens, Uns, WalletPermission, WalletState } from './types.js';
export declare const ethersProviders: {
    [key: string]: providers.StaticJsonRpcProvider;
};
export declare function getProvider(chain: Chain): providers.StaticJsonRpcProvider;
export declare function requestAccounts(provider: EIP1193Provider): Promise<ProviderAccounts>;
export declare function selectAccounts(provider: EIP1193Provider): Promise<ProviderAccounts>;
export declare function getChainId(provider: EIP1193Provider): Promise<string>;
export declare function listenAccountsChanged(args: {
    provider: EIP1193Provider;
    disconnected$: Observable<string>;
}): Observable<ProviderAccounts>;
export declare function listenChainChanged(args: {
    provider: EIP1193Provider;
    disconnected$: Observable<string>;
}): Observable<ChainId>;
export declare function trackWallet(provider: EIP1193Provider, label: WalletState['label']): void;
export declare function getEns(address: Address, chain: Chain): Promise<Ens | null>;
export declare function getUns(address: Address, chain: Chain): Promise<Uns | null>;
export declare function getBalance(address: string, chain: Chain): Promise<Balances | null>;
export declare function switchChain(provider: EIP1193Provider, chainId: ChainId): Promise<unknown>;
export declare function addNewChain(provider: EIP1193Provider, chain: Chain): Promise<unknown>;
export declare function getPermissions(provider: EIP1193Provider): Promise<WalletPermission[]>;
export declare function syncWalletConnectedAccounts(label: WalletState['label']): Promise<void>;
