import { ProviderRpcError } from './errors.js';
/**
 * Takes a provider instance along with events
 * and requests to override and returns an EIP1193 provider
 *
 *  ## Example:
 *
 * *Overriding events: *
 * ```typescript
 * ```
 *
 * @param provider The provider to patch
 * @param requestPatch An `object` with the method to patch
 * and the implementation with which to patch
 * @param events Events to patch
 * @returns An EIP1193 Provider
 */
export const createEIP1193Provider = (provider, requestPatch) => {
    let baseRequest;
    if (provider.request) {
        // Copy the original request method and bind the provider context to it
        baseRequest = provider.request.bind(provider);
    }
    else if (provider.sendAsync) {
        baseRequest = createRequest(provider);
    }
    const request = async ({ method, params }) => {
        const key = method;
        // If the request method is set to null
        // this indicates this method is not supported
        if (requestPatch && requestPatch[key] === null) {
            throw new ProviderRpcError({
                code: 4200,
                message: `The Provider does not support the requested method: ${method}`
            });
        }
        if (requestPatch && requestPatch[key]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore // @TODO - Fix this type error
            return requestPatch[key]({ baseRequest, params });
        }
        else if (baseRequest) {
            return baseRequest({ method, params });
        }
        else {
            throw new ProviderRpcError({
                code: 4200,
                message: `The Provider does not support the requested method: ${method}`
            });
        }
    };
    provider.request = request;
    return provider;
};
const createRequest = (provider) => (({ method, params }) => new Promise((resolve, reject) => {
    provider.sendAsync({
        id: 0,
        jsonrpc: '2.0',
        method,
        params
    }, (error, { result }) => {
        if (error) {
            reject(JSON.parse(error));
        }
        else {
            resolve(result == undefined ? null : result);
        }
    });
}));
