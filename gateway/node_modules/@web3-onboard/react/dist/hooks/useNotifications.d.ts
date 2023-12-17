import type { CustomNotification, Notify, UpdateNotification, Notification, PreflightNotificationsOptions } from '@web3-onboard/core';
export declare const useNotifications: () => [Notification[], (updatedNotification: CustomNotification) => {
    dismiss: () => void;
    update: UpdateNotification;
}, (update: Partial<Notify>) => void, (options: PreflightNotificationsOptions) => Promise<void | string>];
