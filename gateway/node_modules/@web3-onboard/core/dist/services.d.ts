import type { MultiChain } from 'bnc-sdk';
import type SDK from 'bnc-sdk';
/**
 *
 * @returns MultiChain SDK if apiKey
 */
export declare function getBNMulitChainSdk(): Promise<MultiChain | null>;
/**
 *
 * @returns SDK if apiKey
 */
export declare function getBlocknativeSdk(): Promise<SDK>;
