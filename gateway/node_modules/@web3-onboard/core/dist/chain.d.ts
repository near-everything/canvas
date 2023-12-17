import type { WalletState } from './types.js';
declare function setChain(options: {
    chainId: string | number;
    chainNamespace?: string;
    wallet?: WalletState['label'];
    rpcUrl?: string;
    label?: string;
    token?: string;
}): Promise<boolean>;
export default setChain;
