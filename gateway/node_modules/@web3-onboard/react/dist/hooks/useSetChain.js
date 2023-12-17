import { useState, useCallback } from 'react';
import { useAppState } from './useAppState.js';
import { useWeb3Onboard } from '../context.js';
export const useSetChain = (walletLabel) => {
    const web3Onboard = useWeb3Onboard();
    const { setChain } = web3Onboard;
    const { wallets, chains } = useAppState();
    const getChain = () => {
        const wallet = walletLabel
            ? wallets.find(({ label }) => label === walletLabel)
            : wallets[0];
        return wallet && wallet.chains ? wallet.chains[0] : null;
    };
    const connectedChain = getChain();
    const [settingChain, setInProgress] = useState(false);
    const set = useCallback(async (options) => {
        setInProgress(true);
        const success = await setChain({ ...options, wallet: walletLabel });
        setInProgress(false);
        return success;
    }, []);
    return [{ chains, connectedChain, settingChain }, set];
};
