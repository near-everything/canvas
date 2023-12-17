import { WalletInit } from '@web3-onboard/common';
interface LedgerOptions {
    chainId?: number;
    bridge?: string;
    infuraId?: string;
    rpc?: {
        [chainId: number]: string;
    };
}
declare function ledger(options?: LedgerOptions): WalletInit;
export default ledger;
