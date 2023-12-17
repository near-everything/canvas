import type { ConnectOptions, ConnectOptionsString, WalletState } from './types.js';
declare function connect(options?: ConnectOptions | ConnectOptionsString): Promise<WalletState[]>;
export default connect;
