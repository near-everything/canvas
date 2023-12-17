import type { Device, ProviderRpcErrorCode } from '@web3-onboard/common';
import type { InjectedProvider, InjectedWalletModule } from './types.js';
export declare class ProviderRpcError extends Error {
    message: string;
    code: ProviderRpcErrorCode | number;
    data?: unknown;
    constructor(error: Pick<ProviderRpcError, 'message' | 'code' | 'data'>);
}
export declare const defaultWalletUnavailableMsg: ({ label }: InjectedWalletModule) => string;
export declare const isWalletAvailable: (provider: InjectedProvider, checkProviderIdentity: InjectedWalletModule['checkProviderIdentity'], device: Device) => boolean;
