import type { EthereumTransactionData } from 'bnc-sdk';
import type { CustomNotification, Notification, NotificationType } from './types.js';
export declare function handleTransactionUpdates(transaction: EthereumTransactionData): void;
export declare function transactionEventToNotification(transaction: EthereumTransactionData, customization: CustomNotification | boolean | void): Notification;
export declare function eventToType(eventCode: string | undefined): NotificationType;
export declare function typeToDismissTimeout(type: string): number;
