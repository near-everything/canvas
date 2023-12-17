import type { PreflightNotificationsOptions } from './types.js';
export declare function preflightNotifications(options: PreflightNotificationsOptions): Promise<string | void>;
export declare function extractMessageFromError(error: {
    message: string;
    stack: string;
}): {
    eventCode: string;
    errorMsg: string;
};
