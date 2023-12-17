import type { RequestPatch, EIP1193Provider } from './types.js';
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
export declare const createEIP1193Provider: (provider: any, requestPatch?: RequestPatch) => EIP1193Provider;
