import { useWeb3Onboard } from '../context.js';
import { useAppState } from './useAppState.js';
export const useNotifications = () => {
    const web3Onboard = useWeb3Onboard();
    const customNotification = web3Onboard.state.actions.customNotification;
    const updateNotify = web3Onboard.state.actions.updateNotify;
    const preflightNotifications = web3Onboard.state.actions.preflightNotifications;
    return [
        useAppState('notifications'),
        customNotification,
        updateNotify,
        preflightNotifications
    ];
};
