import { useWeb3Onboard } from '../context.js';
export const useAccountCenter = () => useWeb3Onboard().state.actions.updateAccountCenter;
