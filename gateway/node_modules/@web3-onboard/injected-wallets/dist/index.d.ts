import type { WalletInit } from '@web3-onboard/common';
import type { InjectedWalletOptions } from './types.js';
export { ProviderIdentityFlag, ProviderLabel } from './types.js';
declare function injected(options?: InjectedWalletOptions): WalletInit;
export default injected;
