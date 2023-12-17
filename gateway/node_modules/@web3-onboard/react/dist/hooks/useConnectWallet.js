import { useCallback, useState } from 'react';
import { useWeb3Onboard } from '../context.js';
import { useAppState } from './useAppState.js';
export const useConnectWallet = () => {
    const web3Onboard = useWeb3Onboard();
    const { connectWallet, disconnectWallet } = web3Onboard;
    const wallets = useAppState('wallets');
    const wallet = wallets[0] || null;
    const [connecting, setConnecting] = useState(false);
    const connect = useCallback(async (options) => {
        setConnecting(true);
        const walletState = await connectWallet(options);
        setConnecting(false);
        return walletState;
    }, []);
    const disconnect = useCallback(async ({ label }) => {
        setConnecting(true);
        const walletState = await disconnectWallet({ label });
        setConnecting(false);
        return walletState;
    }, []);
    const updateBalances = web3Onboard.state.actions.updateBalances;
    const setWalletModules = web3Onboard.state.actions.setWalletModules;
    const setPrimaryWallet = web3Onboard.state.actions.setPrimaryWallet;
    return [
        { wallet, connecting },
        connect,
        disconnect,
        updateBalances,
        setWalletModules,
        setPrimaryWallet
    ];
};
