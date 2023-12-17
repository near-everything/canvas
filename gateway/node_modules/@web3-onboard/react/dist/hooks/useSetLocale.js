import { useWeb3Onboard } from '../context.js';
export const useSetLocale = () => useWeb3Onboard().state.actions.setLocale;
