/// <reference types="node" />
export interface INep0413_SignMessageParams {
    /**
     * The message that wants to be transmitted.
     */
    message: string;
    /**
     * The receiver to whom the message is destined (e.g. "alice.near" or "myapp.com").
     */
    recipient: string;
    /**
     * A nonce that uniquely identifies this instance of the message, denoted as a 32 bytes array (a fixed `Buffer` in JS/TS).
     */
    nonce: Buffer;
    /**
     * Optional, applicable to browser wallets (e.g. MyNearWallet). The URL to call after the signing process. Defaults to `window.location.href`.
     */
    callbackUrl?: string;
    /**
     * Optional, applicable to browser wallets (e.g. MyNearWallet). A state for authentication purposes.
     */
    state?: string;
}
export interface INep0413_PayloadToSign {
    message: string;
    nonce: Buffer;
    recipient: string;
    callbackUrl?: string;
}
export interface INep0413_SignedMessage {
    /**
     * The account name to which the publicKey corresponds as plain text (e.g. "alice.near")
     */
    accountId: string;
    /**
     * The public counterpart of the key used to sign, expressed as a string with format "<key-type>:<base-64-key-bytes>"
     */
    publicKey: string;
    /**
     * The base64 representation of the signature.
     */
    signature: string;
    /**
     * Optional, applicable to browser wallets (e.g. MyNearWallet). The same state passed in SignMessageParams.
     */
    state?: string;
}
