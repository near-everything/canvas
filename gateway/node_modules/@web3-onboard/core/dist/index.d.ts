import connectWallet from './connect.js';
import disconnectWallet from './disconnect.js';
import setChain from './chain.js';
import type { InitOptions } from './types.js';
import updateBalances from './update-balances.js';
import { preflightNotifications } from './preflight-notifications.js';
import { updateAccountCenter, updateNotify, customNotification, setLocale, setPrimaryWallet, setWalletModules, updateTheme } from './store/actions.js';
declare const API: {
    connectWallet: typeof connectWallet;
    disconnectWallet: typeof disconnectWallet;
    setChain: typeof setChain;
    state: {
        get: () => import("./types.js").AppState;
        select: {
            (): import("rxjs").Observable<import("./types.js").AppState>;
            <T extends keyof import("./types.js").AppState>(stateKey: T): import("rxjs").Observable<import("./types.js").AppState[T]>;
        };
        actions: {
            setWalletModules: typeof setWalletModules;
            setLocale: typeof setLocale;
            updateNotify: typeof updateNotify;
            customNotification: typeof customNotification;
            preflightNotifications: typeof preflightNotifications;
            updateBalances: typeof updateBalances;
            updateAccountCenter: typeof updateAccountCenter;
            setPrimaryWallet: typeof setPrimaryWallet;
            updateTheme: typeof updateTheme;
        };
    };
};
export type OnboardAPI = typeof API;
export type { InitOptions, ConnectOptions, DisconnectOptions, WalletState, ConnectedChain, AccountCenter, AppState, CustomNotification, Notification, Notify, UpdateNotification, PreflightNotificationsOptions, Theme } from './types.js';
export type { EIP1193Provider } from '@web3-onboard/common';
declare function init(options: InitOptions): OnboardAPI;
export default init;
