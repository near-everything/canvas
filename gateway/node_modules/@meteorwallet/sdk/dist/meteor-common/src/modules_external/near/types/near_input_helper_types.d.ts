import { ENearNetwork } from "./near_basic_types";
export interface IWithContractName {
    contractName: string;
}
export interface IWithAccountId {
    accountId: string;
}
export interface IWithReceiverId {
    receiverId: string;
}
export interface IWithTokenId {
    tokenId: string;
}
export interface IWithValidatorId {
    validatorId: string;
}
export interface IWithStringAmount {
    amount: string;
}
export interface IWithNetwork {
    network: ENearNetwork;
}
export interface IWithPagination {
    offset?: number | string;
    limit?: number;
}
export interface IWithTransactionOutcomes {
}
export interface IWithAccountIdAndNetwork extends IWithAccountId, IWithNetwork {
}
export interface IWithContractId {
    contractId: string;
}
export interface IWithGas {
    gasAmount: string;
}
