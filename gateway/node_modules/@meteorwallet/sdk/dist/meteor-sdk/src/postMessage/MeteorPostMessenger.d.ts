import { EDappActionSource, EExternalActionType, IMeteorActionResponse_Output, IMeteorComInjectedObject, IPostMessageConnection, TClientPostMessageResponse, TMeteorComListener, TPostMessageSend } from "../../../meteor-common/src/modules_feature/dapp_connect/types_dappConnect";
import { ENearNetwork } from "../../../meteor-common/src/modules_external/near/types/near_basic_types";
interface IOConnectAndWaitForResponse_Input {
    network: ENearNetwork;
    actionType: EExternalActionType;
    inputs: any;
}
declare global {
    interface Window {
        meteorCom?: IMeteorComInjectedObject;
    }
}
declare class ComWindow {
    comType: EDappActionSource;
    websiteWindow: Window | undefined;
    wasOpened: boolean;
    walletOrigin: string;
    constructor(connection: IPostMessageConnection, listener: TMeteorComListener<TClientPostMessageResponse>);
    focus(): void;
    sendMessage(data: TPostMessageSend): void;
    isWindowClosed(): boolean;
    hasActiveWindow(): boolean;
    close(): void;
}
declare class MeteorPostMessenger {
    baseWalletUrl: string;
    walletOrigin: string;
    listener: (data: TClientPostMessageResponse) => void;
    connections: IPostMessageConnection[];
    comWindow: ComWindow | undefined;
    comInterval: any;
    constructor();
    removeConnection(uid: string): void;
    updateConnection(uid: string, newConnectionProperties: Partial<IPostMessageConnection>): void;
    sendComs(): void;
    addAndStartConnection(connection: IPostMessageConnection): void;
    connectAndWaitForResponse<T>({ actionType, network, inputs, }: IOConnectAndWaitForResponse_Input): Promise<IMeteorActionResponse_Output<T>>;
}
export declare function getMeteorPostMessenger(): MeteorPostMessenger;
export {};
