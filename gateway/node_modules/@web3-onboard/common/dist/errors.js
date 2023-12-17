export class ProviderRpcError extends Error {
    constructor(error) {
        super(error.message);
        this.message = error.message;
        this.code = error.code;
        this.data = error.data;
    }
}
