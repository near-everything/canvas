export class ProviderRpcError extends Error {
    constructor(error) {
        super(error.message);
        this.message = error.message;
        this.code = error.code;
        this.data = error.data;
    }
}
export const defaultWalletUnavailableMsg = ({ label }) => `Please install or enable ${label} to continue`;
export const isWalletAvailable = (provider, checkProviderIdentity, device) => {
    var _a;
    // No injected providers exist.
    if (!provider) {
        return false;
    }
    // Many injected providers add their own object into window.
    if (checkProviderIdentity({ provider, device })) {
        return true;
    }
    // For multiple injected providers, check providers array
    // example coinbase inj wallet pushes over-ridden wallets
    // into a providers array at window.ethereum
    return !!((_a = provider.providers) === null || _a === void 0 ? void 0 : _a.some(provider => checkProviderIdentity({ provider, device })));
};
