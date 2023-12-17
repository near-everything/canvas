import type { DisconnectOptions, WalletState } from './types.js';
declare function disconnect(options: DisconnectOptions): Promise<WalletState[]>;
export default disconnect;
